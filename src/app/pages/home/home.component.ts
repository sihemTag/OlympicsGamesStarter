import { Component, OnInit } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, Chart, registerables, ChartOptions, ChartEvent, ActiveElement } from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import {Olympic} from 'src/app/core/models/Olympic';
import {Participation} from 'src/app/core/models/Participation';
import { Router } from '@angular/router';
Chart.register(...registerables, ChartDataLabels);


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss'],
  imports : [BaseChartDirective, CommonModule],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public pieChartLabels: string[] = [];  //pays
  public pieChartType: 'pie' = 'pie';
  public pieChartData: ChartData<'pie'> = { 
    labels: [],
    datasets: [
      {
        data: [],  // Medal count data
        backgroundColor: ['#b30000', '#009999', '#6666ff', '#b3b3ff', '#b33c00'],  
      }
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#fff', 
        formatter: (value, context) => {
          // Afficher le label correspondant
          return context.chart.data.labels?.[context.dataIndex];
        },
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    onClick: (event, elements, chart) => {
      this.onChartClick(event, elements, chart);
    },
  };
  
  
  constructor(private olympicService: OlympicService, private router: Router) {}

ngOnInit(): void {
  this.olympics$ = this.olympicService.getOlympics();
  this.olympics$.subscribe((data) => {
    if(data){
      this.updateChartData(data);
    } // Mettre à jour les données du graphique quand les données sont reçues 
  });
}

private updateChartData(data: Olympic[]): void {
  // Exemple pour préparer les données à afficher sur le graphique pie
  this.pieChartLabels = data.map((country: Olympic) => country.country); // Utiliser les noms des pays comme labels

  this.pieChartData.labels = this.pieChartLabels;
  this.pieChartData.datasets[0].data = data.map((country: Olympic) => {
    return country.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0);
  });
}

public onChartClick(event: ChartEvent, elements: ActiveElement[], chart: Chart): void {
  if (elements.length > 0) {
    const index = elements[0].index; // Obtenir l'index de l'élément cliqué
    const countryName = this.pieChartLabels[index]; // Récupérer le pays correspondant
    if (countryName) {
      // Rediriger vers la page de détails avec le nom du pays comme paramètre
      this.router.navigate(['/country', countryName]);
    }
  }
}

}

