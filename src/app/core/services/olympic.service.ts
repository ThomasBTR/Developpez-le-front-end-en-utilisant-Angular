import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {OLYMPICS} from "../../mockOlympics";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic>( {
    id: 1,
    country: 'Italy',
    participations: [
      {
        id: 1,
        year: 2012,
        city: "Londres",
        medalsCount: 28,
        athleteCount: 372
      }
    ]
  });

  constructor(private http: HttpClient, private messageService : MessageService) {}

  loadInitialData() {
    return this.http.get<Olympic>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        if (error) {
          this.olympics$.unsubscribe();
          console.error(error);
          throw new Error(error);
        }
        // can be useful to end loading state and let the user know something went wrong
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympic[]>{
    const olympics = of(OLYMPICS);
    this.messageService.add('OlympicService: fetched olympics');
    return olympics;
  }

  // getOlympics() {
  //   return this.olympics$.asObservable();
  // }

  getOlympicTable() : Olympic[] {
    return OLYMPICS;
  }
}
