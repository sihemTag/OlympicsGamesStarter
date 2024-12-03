import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-jo',
  templateUrl: './info-jo.component.html',
  styleUrl: './info-jo.component.scss'
})
export class InfoJOComponent implements OnInit{

  public olympics$: Observable<Olympic[] | null> = of(null);
  nbJOs: number = 0;

  
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(olympics => {
      console.log('olympics:', olympics);
      if (olympics) {
        this.nbJOs = this.getNbJOs(olympics);
        console.log('nbJOs:', this.nbJOs);
      }
    });
  }

  goBack(){
    this.router.navigate(['']);
  }

  getNbJOs(olympics: Olympic[]): number {
    const years = olympics.flatMap( o => o.participations.map(p => p.year));
    const uniqueYears = new Set(years);
    return uniqueYears.size;
  }

}
