import {Component, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {OlympicService} from "../../core/services/olympic.service";
import {MessageService} from "../../core/services/message.service";

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})
export class OlympicComponent implements OnInit {

  olympics: Olympic[] = [];

  selectedOlympic?: Olympic;
  participations?: Participation[];

  constructor(private olympicService: OlympicService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getOlympics();
  }

  private log(message: string) {
    this.messageService.add(`OlympicComponent: ${message}`);
  }

  getOlympics(): void {
    // async with Observable
    this.log('gathering olympics from service');
    this.olympicService.getOlympics().subscribe(olympics => this.olympics = olympics);
    // sync without Observable
    // this.olympics = this.olympicService.getOlympicTable();
  }
}
