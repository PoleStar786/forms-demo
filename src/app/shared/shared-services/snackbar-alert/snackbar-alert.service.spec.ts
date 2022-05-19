import { TestBed } from '@angular/core/testing';

import { SnackbarAlertService } from './snackbar-alert.service';

describe('SnackbarAlertService', () => {
  let service: SnackbarAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
