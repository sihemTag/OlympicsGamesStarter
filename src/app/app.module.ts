import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { InfoJOComponent } from './pages/info-jo/info-jo.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { FooterComponent } from './pages/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent,HomeComponent, NotFoundComponent, InfoJOComponent, CountryDetailsComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PieChartComponent, LineChartComponent, MatIconModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
