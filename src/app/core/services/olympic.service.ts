import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = 'api/olympics';
  private olympics$ = new BehaviorSubject<Olympic>({
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

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`OlympicService: ${message}`);
  }

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

  //Method with a mock of Olympic
  // getOlympics() : Observable<Olympic[]>{
  //   const olympics = of(OLYMPICS);
  //   this.log('OlympicService: fetched olympics');
  //   return olympics;
  // }


  //Gather data from olympicMockDataServer from databases/InMemoryDataService
  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl)
      .pipe(
        tap(
          (value) => this.log('fetched olympics')),
        catchError((error, caught) => {
          if (error) {
            this.handleError<Olympic[]>('get Olympics', []);
          }
          return caught;
        })
      );
  }

  getOlympic(id: number): Observable<Olympic> {
    const url = `${this.olympicUrl}/${id}`;
    return this.http.get<Olympic>(url).pipe(
      tap(value => this.log(`fetched olympic with id=${id}`)),
      catchError(
        this.handleError<Olympic>(`getHero id=${id}`)
      ));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getOlympics() {
  //   return this.olympics$.asObservable();
  // }
}
