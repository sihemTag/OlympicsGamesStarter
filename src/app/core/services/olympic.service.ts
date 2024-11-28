import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from 'src/app/core/models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  //Charger et émettre les données depuis le fichier JSON via le BehaviorSubject
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        /*quand tu actualise la page par ex pendant que la requete n'est pas finie, la requete ne s'arrete pas et une autre se lance
        ça peut créer une surcharge, du coup il faut gérer ça*/
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  //Méthode pour s'abonner au BehaviorSubject
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
