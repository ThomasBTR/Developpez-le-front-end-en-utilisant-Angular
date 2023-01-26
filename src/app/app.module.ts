import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {ParticipationComponent} from "./components/participation/participation.component";
import {OlympicComponent} from "./components/olympic/olympic.component";
import { MessagesComponent } from './components/messages/messages.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/databases/in-memory-data.service';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent,ParticipationComponent, OlympicComponent, MessagesComponent, CountryDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
