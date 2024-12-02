import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import {Olympic} from 'src/app/core/models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  private destroy$ = new Subject<void>();
  //private isLoading = false;

  constructor(private http: HttpClient) {}

  //Charger et émettre les données depuis le fichier JSON via le BehaviorSubject
  loadInitialData() {
    /*if(this.isLoading){
      return of();
    }
    this.isLoading = true;*/
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      takeUntil(this.destroy$),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);
        return of(null);
      }),
      /*finalize(()=>{
        this.isLoading = false;
      })*/
    );
  }

  //Méthode pour s'abonner au BehaviorSubject
  getOlympics() {
    return this.olympics$.asObservable();
  }

  ngOnDestroy() : void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
