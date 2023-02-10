import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {Router} from "@angular/router";
import {Options} from "../../core/models/Options";
import {DataLabelString} from "../../core/models/DataLabelString";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  data!: DataLabelString;
  options!: Options;

  joCount!: number;
  countryCount !: number;

  subscription !: Subscription;

  constructor(private olympicService: OlympicService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.subscription = this.getOlympics();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // private log(message: string) {
  //   this.messageService.add(`HomeComponent: ${message}`);
  // }

  getOlympics(): Subscription {
    // async with Observable
    // this.log('gathering olympics from service');
    this.options = {
      plugins: {
        legend: {
          display: true,
          padding: 2
        }
      }
    }
    return this.olympicService.getOlympics().subscribe(
      {
        next: (olympicTable: Olympic[]) => {
          const labels: string[] = [];
          const datasets: number[] = [];

          olympicTable.forEach(olympicItem => {
            labels.push(olympicItem.country);
            datasets.push(this.sumMedalCounts(olympicItem.participations));
            if (this.joCount !== olympicItem.participations.length) {
              this.joCount = olympicItem.participations.length;
            }
          });
          this.countryCount = labels.length;
          this.data = {
            labels: labels,
            datasets: [
              {
                data: datasets,
                backgroundColor: ['#956065', '#B8CBE7', '#89A1DB', '#793D52', '#9780A1'],
                hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
              }
            ]
          };
        },
        error: err => {
          console.log("HomeComponent: Error while getting observable : ", err);
          this.subscription.unsubscribe();
          this.router.navigateByUrl("/not-found").then(r => console.log("HomeComponent: call not-found result : ", r));
        },
        complete() {
          console.log("HomeComponent: Observable received completely");
        }
      });
  };

  private sumMedalCounts(participations: Participation[]): number {
    return participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);
  }

  getCountry(e: any): void{
    const id : number = e.element.index+1;
   this.router.navigateByUrl(`/detail/${id}`)
     .then(r => console.log("HomeComponent: getCountry() result : ", r));
  }
}
