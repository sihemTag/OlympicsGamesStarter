import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { catchError, map, filter, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryGuard implements CanActivate {
  constructor(private olympicService: OlympicService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const countryName = route.paramMap.get('name');

    return this.olympicService.getOlympics().pipe(
      filter((olympics) => olympics !== null), // Attend que les données soient disponibles
      take(1),
      map((olympics) => {
        console.log('Country in URL:', countryName);
        console.log('Available countries:', olympics?.map(o => o.country));
        const exists = olympics?.some((o) => o.country === countryName);
        console.log('exists:', exists);
        if (!exists) {
          this.router.navigate(['/not-found']);
        }
        return !!exists;
      }),
      catchError(
        () => {
          this.router.navigate(['not-found']);
          return of(false);
        })
    );
  }
}