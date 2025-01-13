import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Stats } from 'src/app/core/models/Stats';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({ 
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit, OnDestroy{
  countryName: string | null = null;
  olympics$: Observable<Olympic[]|null> = of(null);
  stats: Stats = {nbEntries:0, nbMedals:0, nbAthletes:0};
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {}

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

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
