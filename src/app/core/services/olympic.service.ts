import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

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

  constructor(private http: HttpClient) {}

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

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
