import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, Subject } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe(); 
  }

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
