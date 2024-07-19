import { TestBed } from '@angular/core/testing';

import { EntrepriseSelectedService } from './entreprise-selected.service';

describe('EntrepriseSelectedService', () => {
  let service: EntrepriseSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
