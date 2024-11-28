import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Stats } from 'src/app/core/models/Stats';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({ 
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit{
  countryName: string | null = null;
  olympics$: Observable<Olympic[]|null> = of(null);

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router, private stats: Stats) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('name');
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data)=> {
      if(data){
        this.updateStats(data);    
      }
    }) 
  }

  updateStats(data: Olympic[]): void{
    /* mettre tout ça dans une méthode et chercher une autre alternative que maps car là la donnée est transformée mais pas utilisée
      ailleurs. utiliser peut etre les opérateurs de Rxjs*/
    data.map((country: Olympic)=> {
      if(country.country == this.countryName) {
        this.stats.nbEntries = country.participations.length;
        this.stats.nbMedals = country.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0);
        this.stats.nbAthletes = country.participations.reduce((total: number, participation: Participation) => total + participation.athleteCount, 0);
      } 
    }); 
  }

  goBack(){
    this.router.navigate(['/infoJO']);
  }

}
