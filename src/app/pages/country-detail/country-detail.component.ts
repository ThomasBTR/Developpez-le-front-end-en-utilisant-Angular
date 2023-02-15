import {Component, OnDestroy, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/dataset/Olympic";
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Location} from '@angular/common';
import {Options} from "../../core/models/rendering/Options";
import {DataLabelNumber} from "../../core/models/rendering/DataLabelNumber";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit, OnDestroy {

  country!: string;
  entries: number = 0;
  medalsCount: number = 0;
  athletesCount: number = 0;
  data!: DataLabelNumber;

  options!: Options;

  subscription !: Subscription;

  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.getCurrentOlympic();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

//TODO: convert to chart gathering data
  private getCurrentOlympic(): Subscription {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.options = {
      indexAxis: 'y',

      plugins: {
        title: {
          display: true,
          text: 'Medals per year',
          fontColor: '#000000',
          fontSize: 25,
          position : 'left'
        },
        legend: {
          display: false
        }
      }
    }
    return this.olympicService.getOlympic(id).subscribe(
      {
        next: (olympic: Olympic) => {
          this.country = olympic.country;
          const label: Array<number> = [];
          const data: Array<number> = [];
          olympic.participations.forEach(
            participationItem => {
              label.push(participationItem.year);
              data.push(participationItem.medalsCount);
              this.medalsCount += participationItem.medalsCount;
              this.entries += 1;
              this.athletesCount += participationItem.athleteCount;
            });
          this.data = {
            labels: label,
            datasets: [
              {
                data: data,
                backgroundColor: ['#956065', '#B8CBE7', '#89A1DB', '#793D52', '#9780A1'],
                hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
              }
            ]
          };
        },
        error: err => {
          console.log("CountryDetailComponent: Error while getting observable : ", err);
          this.subscription.unsubscribe();
          this.router.navigateByUrl("/not-found")
            .then(r => console.log("CountryDetailComponent: redirect to not-found result : ", r));
        },
        complete() {
          console.log("CountryDetailComponent: Observable received completely");
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
