import {Component, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Participation} from "../../core/models/Participation";
import {Location} from '@angular/common';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {


  entries!: number;
  medalsCount!: number;
  athletesCount!: number;
  data: any;


  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getCurrentOlympic();
  }

//TODO: convert to chart gathering data
  private getCurrentOlympic(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicService.getOlympics().subscribe(
      {
        next: (olympics: Olympic[]) => {

          olympicItem: Olympic =  olympics.filter(value => value.id === id);
          const label: Array<number> = [];
          const data: Array<number> = [];
          olympicItem.participations.forEach(
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
