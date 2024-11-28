import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-info-jo',
  templateUrl: './info-jo.component.html',
  styleUrl: './info-jo.component.scss'
})
export class InfoJOComponent implements OnInit{

  public olympics$: Observable<Olympic[] | null> = of(null);
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

}
