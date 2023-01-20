import {Component, OnInit} from '@angular/core';
import {MockOlympics} from "../../mock-olympics";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit{

  olympics !: Olympic[];

  ngOnInit(): void {
    this.olympics = MockOlympics;
  }



}
