import {Olympic} from "./core/models/Olympic";

export const MockOlympics: Olympic[] = [
  {
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
      }
    ]
  }
]
