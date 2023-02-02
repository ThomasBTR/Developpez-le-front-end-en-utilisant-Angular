import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  data: any;
  options: any;

  joCount!: number;
  countryCount !: number;

  constructor(private olympicService: OlympicService
  ) {
  }

  ngOnInit(): void {
    this.getOlympics();
  }

  // private log(message: string) {
  //   this.messageService.add(`HomeComponent: ${message}`);
  // }

  getOlympics(): void {
    // async with Observable
    // this.log('gathering olympics from service');
    this.olympicService.getOlympics().subscribe(
      {
        next: (olympicTable: Olympic[]) => {
          const label: Array<string> = [];
          const data: Array<number> = [];

          olympicTable.forEach(olympicItem => {
            label.push(olympicItem.country);
            data.push(this.sumMedalCounts(olympicItem.participations));
            if (this.joCount !== olympicItem.participations.length) {
              this.joCount = olympicItem.participations.length;
            }
          });
          this.countryCount = label.length;
          this.data = {
            labels: label,
            datasets: [
              {
                data: data,
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
                hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
              }
            ]
          };
        }
      });
    this.options = {
      plugins: {
        legend: {
          display: true,
          padding: 2
        }
      }
    }
  }

  private sumMedalCounts(participations: Participation[]): number {
    const result: number = participations.filter(value => value.medalsCount !== 0).reduce((previousValue, currentValue) => previousValue + currentValue.medalsCount, 0);
    console.log(result);
    return result;
  }
}
