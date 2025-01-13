import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of , Subject} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, Chart, registerables, ChartOptions, ChartEvent, ActiveElement } from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import {Olympic} from 'src/app/core/models/Olympic';
import {Participation} from 'src/app/core/models/Participation';
import { Router } from '@angular/router';
Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports : [BaseChartDirective, CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy {
   olympics$: Observable<Olympic[] | null> = of(null);
   private destroy$ = new Subject<void>();
   pieChartLabels: string[] = [];  //pays
   pieChartType: 'pie' = 'pie';
   pieChartData: ChartData<'pie'> = { 
    labels: [],
    datasets: [
      {
        data: [],  // Medal count data
        backgroundColor : [],  
      }
    ],
  };

  pieChartOptions: ChartOptions<'pie'> = {
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
      } 
    });
  }
  
  updateChartData(data: Olympic[]): void {

    this.pieChartLabels = data.map((country: Olympic) => country.country); // Utiliser les noms des pays comme labels
    this.pieChartData.labels = this.pieChartLabels;
    this.pieChartData.datasets[0].data = data.map((country: Olympic) => {
      return country.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0);
    });
    this.pieChartData.datasets[0].backgroundColor = this.generateUniqueColors(data.length);
  }
  
  onChartClick(event: ChartEvent, elements: ActiveElement[], chart: Chart): void {
    if (elements.length > 0) {
      const index = elements[0].index; // Obtenir l'index de l'élément cliqué
      const countryName = this.pieChartLabels[index]; // Récupérer le pays correspondant
      if (countryName) {
        this.router.navigate(['/country', countryName]);
      }
    }
  }

  generateUniqueColors(count: number): string[] {
    const colors: Set<string> = new Set();
    while (colors.size < count) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.add(randomColor);  
    }
  
    return Array.from(colors);
  }

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
