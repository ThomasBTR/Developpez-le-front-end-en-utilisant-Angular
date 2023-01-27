import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Olympic} from "../models/Olympic";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const olympics: Olympic[] = [
      {
        id: 1,
        country: "Italy",
        participations: [
          {
            id: 1,
            year: 2012,
            city: "Londres",
            medalsCount: 28,
            athleteCount: 372
          },
          {
            id: 2,
            year: 2016,
            city: "Rio de Janeiro",
            medalsCount: 28,
            athleteCount: 375
          },
          {
            id: 3,
            year: 2020,
            city: "Tokyo",
            medalsCount: 40,
            athleteCount: 381
          }
        ]
      },
      {
        id: 2,
        country: "Spain",
        participations: [
          {
            id: 1,
            year: 2012,
            city: "Londres",
            medalsCount: 20,
            athleteCount: 315
          },
          {
            id: 2,
            year: 2016,
            city: "Rio de Janeiro",
            medalsCount: 17,
            athleteCount: 312
          },
          {
            id: 3,
            year: 2020,
            city: "Tokyo",
            medalsCount: 17,
            athleteCount: 321
          }
        ]
      },
      {
        id: 3,
        country: "United States",
        participations: [
          {
            id: 1,
            year: 2012,
            city: "Londres",
            medalsCount: 109,
            athleteCount: 610
          },
          {
            id: 2,
            year: 2016,
            city: "Rio de Janeiro",
            medalsCount: 123,
            athleteCount: 652
          },
          {
            id: 3,
            year: 2020,
            city: "Tokyo",
            medalsCount: 113,
            athleteCount: 626
          }
        ]
      },
      {
        id: 4,
        country: "Germany",
        participations: [
          {
            id: 1,
            year: 2012,
            city: "Londres",
            medalsCount: 44,
            athleteCount: 425
          },
          {
            id: 2,
            year: 2016,
            city: "Rio de Janeiro",
            medalsCount: 44,
            athleteCount: 422
          },
          {
            id: 3,
            year: 2020,
            city: "Tokyo",
            medalsCount: 37,
            athleteCount: 425
          }
        ]
      },
      {
        id: 5,
        country: "France",
        participations: [
          {
            id: 1,
            year: 2012,
            city: "Londres",
            medalsCount: 35,
            athleteCount: 423
          },
          {
            id: 2,
            year: 2016,
            city: "Rio de Janeiro",
            medalsCount: 45,
            athleteCount: 412
          },
          {
            id: 3,
            year: 2020,
            city: "Tokyo",
            medalsCount: 33,
            athleteCount: 403
          }
        ]
      }
    ];
    return {olympics};
  }
  // Overrides the genId method to ensure that a Olympic always has an id.
  // If the Olympics array is empty,
  // the method below returns the initial number (1).
  // if the Olympics array is not empty, the method below returns the highest
  // Olympic id + 1.
  genId(olympics: Olympic[]): number {
    return olympics.length > 0 ? Math.max(...olympics.map(hero => hero.id)) + 1 : 1;
  }

}
