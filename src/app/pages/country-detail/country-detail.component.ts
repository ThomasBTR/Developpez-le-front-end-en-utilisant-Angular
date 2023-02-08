import {Component, OnDestroy, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Location} from '@angular/common';
import {Options} from "../../core/models/Options";
import {DataLabelNumber} from "../../core/models/DataLabelNumber";
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
              private location: Location) {
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
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
                hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'],
              }
            ]
          };
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
