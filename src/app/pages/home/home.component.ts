import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  showToast = false;
  toastPosition = { top: 0, left: 0 };
  
  constructor(private router: Router){}

  getInformation(){
    this.router.navigate(['/infoJO']);
  }

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleToast(event: MouseEvent) {
    // Inverse l'état du toast
    this.showToast = !this.showToast;

    // Si le toast doit s'afficher, calculez sa position
    if (this.showToast) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.toastPosition = {
        top: rect.bottom + window.scrollY, // Position en bas de l'icône
        left: rect.left + window.scrollX, // Alignement horizontal
      };
    }
  }


}

