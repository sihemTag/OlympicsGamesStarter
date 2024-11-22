import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, Chart, registerables, ChartOptions } from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
Chart.register(...registerables, ChartDataLabels);


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports : [BaseChartDirective, CommonModule],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public pieChartLabels: string[] = [];  //pays
  public pieChartType: 'pie' = 'pie';
  public pieChartData: ChartData<'pie'> = { 
    labels: [],
    datasets: [
      {
        data: [],  // Medal count data
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#FF33F5'],  
      }
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#fff', // Couleur du texte
        formatter: (value, context) => {
          // Affichez le label correspondant
          return context.chart.data.labels?.[context.dataIndex];
        },
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  };
  
  
  constructor(private olympicService: OlympicService) {}

ngOnInit(): void {
  this.olympics$ = this.olympicService.getOlympics();
  this.olympics$.subscribe((data) => {
    this.updateChartData(data); // Mettez à jour les données du graphique quand les données sont reçues
  });
}

private updateChartData(data: any): void {
  // Exemple pour préparer les données à afficher sur le graphique pie
  this.pieChartLabels = data.map((country: any) => country.country); // Utilisez les noms des pays comme labels
  console.log("PieChart Labels: ", this.pieChartLabels); // Affichez les labels dans la console

  this.pieChartData.labels = this.pieChartLabels;
  this.pieChartData.datasets[0].data = data.map((country: any) => {
    return country.participations.reduce((total: number, participation: any) => total + participation.medalsCount, 0);
  });
}

}

