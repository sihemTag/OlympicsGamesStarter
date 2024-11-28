import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart, ChartData, ChartOptions, ChartType, registerables} from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(...registerables);


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
})
export class CountryDetailsComponent implements OnInit{
  public countryName: string | null = null;
  public olympics$: Observable<Olympic[]|null> = of(null);
  public nbEntries: number = 0;
  public nbMedals: number = 0;
  public nbAthletes: number = 0;

  // Données pour le graphique
  public lineChartData: ChartData<'line'> = {
    labels: [], // Années des participations
    datasets: [
      {
        data: [], // Nombre de médailles
        label: 'Number of Medals',
        borderColor: '#FF5733',
        fill: false
      }
    ]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Medals'
        }
      }
    }
  };

  public lineChartType: 'line' = 'line'; 



  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    
    this.countryName = this.route.snapshot.paramMap.get('name');
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data)=> {
      /* mettre tout ça dans une méthode et chercher une autre alternative que maps car là la donnée est transformée mais pas utilisée
      ailleurs. utiliser peut etre les opérateurs de Rxjs*/
      if(data){
        data.map((country: Olympic)=> {
          if(country.country == this.countryName) {
            this.nbEntries = country.participations.length;
            this.nbMedals = country.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0);
            this.nbAthletes = country.participations.reduce((total: number, participation: Participation) => total + participation.athleteCount, 0);

            // Extraire les années et le nombre de médailles des participations
            this.lineChartData.labels = country.participations.map(p => p.year.toString());
            this.lineChartData.datasets[0].data = country.participations.map(p => p.medalsCount);
          } 
        });    
      }
    })

    
    
  }


}
