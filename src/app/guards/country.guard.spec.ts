import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { countryGuard } from './country.guard';

describe('countryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => countryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
