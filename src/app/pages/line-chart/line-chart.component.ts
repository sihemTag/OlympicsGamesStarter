import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart, ChartData, ChartOptions, registerables} from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() countryName: string | null = null;
  olympics$: Observable<Olympic[]|null> = of(null);

  // Données pour le graphique
  lineChartData: ChartData<'line'> = {
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

  lineChartOptions: ChartOptions = {
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

  lineChartType: 'line' = 'line'; 

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data)=> {
      if(data){
        this.updateLineChart(data);   
      }
    }) 
  }

  updateLineChart(data:Olympic[]): void{ 
      data = data.filter((country: Olympic) => country.country == this.countryName);
      this.lineChartData.labels = data[0].participations.map(p => p.year.toString());
      this.lineChartData.datasets[0].data = data[0].participations.map(p => p.medalsCount);
  }

}
