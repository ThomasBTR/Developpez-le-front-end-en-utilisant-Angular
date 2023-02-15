<img alt="angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white">  <img alt="npm" src="https://img.shields.io/npm/v/npm"> <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ThomasBTR/Developpez-le-front-end-en-utilisant-Angular"><br>
<img alt="npm current version" src="https://img.shields.io/github/release/ThomasBTR/Developpez-le-front-end-en-utilisant-Angular.svg">



# Olympic Games Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5, [Node](https://nodejs.org/en/) version 18.14.0 LTS, [npm](https://www.npmjs.com/package/npm) 9.3.1.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `npm run start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` (or `ng build`) to build the project. The build artifacts will be stored in the `dist/` directory.

## How the code is constructed

As of the architecture already defined at project startup, the current release includes the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
  - `home` page give homepage view available at standard base path.
  - `country-detail` page is a detailed view per country, with a summarized number of participation's, and the total of medals won as well as the total of athletes.
  - `not-found` page can only be available if the data can not be gathered by the service from the dataset.
- `core` folder: contains the business logic :
  - `services`folder : reusable service for business logic. <br>
  Here is currently available OlympicService, that make initial data gathered from asset folder through RxJS Observable.
  
  - `models` folders : set reusable typescript interfaces for both initial dataset from datatable and rendering models
    - `dataset` : interfaces for data gathered currently from a mock (available in `src/assets/mock/olympic.json`). <br> 
    Will be usable with a connected database that contain object following the current models.
    - `rendering` : interfaces used for rendering data in a couple of chart type (pie and bar).

### Best Practise :
* Update angular requirement to latest angular 15 version
* [Angular Best Practices](https://angular.io/guide/security) implemented, especially regarding security.

## Visual library :
* [Primeng](https://primeng.org/) is used for the visual charts of the application. <br>
* [PrimeFlex](https://www.primefaces.org/primeflex/) is used for the other layout of the application. <br>


*
