import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { InfoJOComponent } from './pages/info-jo/info-jo.component';
import { CountryGuard } from './guards/country.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'country/:name', component: CountryDetailsComponent, canActivate: [CountryGuard],
  },
  {
    path: 'infoJO', component: InfoJOComponent,
  },
  {
    path: 'not-found', component: NotFoundComponent,
  },
  {
    path: '**', component: NotFoundComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
