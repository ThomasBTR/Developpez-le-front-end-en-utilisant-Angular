import {Component, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {Participation} from "../../core/models/Participation";
import { Location } from '@angular/common';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  olympic?: Olympic;
  participations?: Participation[];


  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getCurrentOlympic();
  }


  private getCurrentOlympic(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.olympicService.getOlympic(id).subscribe(olympic => {
      this.olympic = olympic;
      this.participations = olympic.participations;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
