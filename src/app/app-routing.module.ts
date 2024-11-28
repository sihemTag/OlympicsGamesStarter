import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { InfoJOComponent } from './pages/info-jo/info-jo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'country/:name', component: CountryDetailsComponent,
  },
  {
    path: 'infoJO', component: InfoJOComponent,
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
