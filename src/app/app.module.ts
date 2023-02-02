import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import {ChartModule} from "primeng/chart";
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, MessagesComponent, CountryDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule, CardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
