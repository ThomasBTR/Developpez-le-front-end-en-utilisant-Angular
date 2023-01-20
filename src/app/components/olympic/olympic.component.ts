import {Component, OnInit} from '@angular/core';
import {MockOlympics} from "../../mock-olympics";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit{

  olympics : Olympic[] = [];

  selectedOlympic?: Olympic;
  participations?: Participation[];

  constructor(private olympicService : OlympicService) {
  }

  ngOnInit(): void {
    this.olympicService.getOlympics();
  }

  onSelect(olympic: Olympic) {
    this.selectedOlympic = olympic;
    this.participations = olympic.participations;
  }




}
