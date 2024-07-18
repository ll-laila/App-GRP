import { TestBed } from '@angular/core/testing';

import { EntrepriseSharedService } from './entreprise-shared.service';

describe('EntrepriseSharedService', () => {
  let service: EntrepriseSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
