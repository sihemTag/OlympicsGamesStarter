import { Component, OnDestroy } from '@angular/core';
import {Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
