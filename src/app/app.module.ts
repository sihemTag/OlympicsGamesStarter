import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { InfoJOComponent } from './pages/info-jo/info-jo.component';

@NgModule({
  declarations: [AppComponent,HomeComponent, NotFoundComponent, InfoJOComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PieChartComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
