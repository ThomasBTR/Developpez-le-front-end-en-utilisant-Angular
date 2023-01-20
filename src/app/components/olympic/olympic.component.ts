import {Component, OnInit} from '@angular/core';
import {MockOlympics} from "../../mock-olympics";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent{

  olympics : Olympic[] = MockOlympics;

  selectedOlympic?: Olympic;
  participations?: Participation[];

  onSelect(olympic: Olympic) {
    this.selectedOlympic = olympic;
    this.participations = olympic.participations;
  }


}
