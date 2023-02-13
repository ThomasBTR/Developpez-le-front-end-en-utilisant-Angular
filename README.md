<img alt="angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white">  <img alt="npm" src="https://img.shields.io/npm/v/npm"> <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ThomasBTR/Developpez-le-front-end-en-utilisant-Angular"><br>
<img alt="npm current version" src="https://img.shields.io/github/release/ThomasBTR/Developpez-le-front-end-en-utilisant-Angular.svg"> 
<img alt="current release" src="src/assets/img/release version-1.0.0-green.svg"><br>



# Olympic Games Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How the code is construct

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
  - `home` page give homepage view available at standard basepath.
  - `country-detail` page is a detailed view per country, with a summarized number of participations, and the total of medals won as well as the total of athletes.
  - `not-found` page can only be available if the data can not be gathered by the service from the dataset.
- `core` folder: contains the business logic :
  - `services`folder : reusable service for business logic. <br>
  Here is currently available OlympicService, that make inital data gathered from asset folder through RxJS Observable.
  
  - `models` folders : set basic models for both initial dataset from datatable and rendering models
    - `dataset` : models for data gathered currently from a mock (avaible in `src/assets/mock/olympic.json`). <br> 
    Will be usable with a connected database that contain object following the current models.
    - `rendering` : models used for rendering data in a couple of chart type (pie and bar).

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!


## What's new :

### Security :
* Update angular requirement to latest angular 15 version

### Core : 
* Create dataset models for olympic & participation
