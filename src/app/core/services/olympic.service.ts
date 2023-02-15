import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/dataset/Olympic";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.handleError("loadInitialData", error)
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
  getOlympic(index: number): Observable<Olympic> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map(olympics => olympics[index-1]),
      tap(value => console.log(`fetched olympic with id=${index} : value=${value}`)),
      catchError( (error, caught) => {
          this.handleError<Olympic>(`getHero id=${index}`, error);
          return caught;
        }
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
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      this.olympics$.unsubscribe();
      this.router.navigateByUrl("/not-found").then(r => console.log("OlympicServiceComponent: call not-found result : ", r));
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
