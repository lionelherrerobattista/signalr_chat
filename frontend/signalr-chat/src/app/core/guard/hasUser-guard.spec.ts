import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasUserGuard } from './hasUser-guard';

describe('chatGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => hasUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
