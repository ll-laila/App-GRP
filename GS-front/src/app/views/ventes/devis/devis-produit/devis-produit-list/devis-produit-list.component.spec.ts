import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisProduitListComponent } from './devis-produit-list.Component';

describe('DevisProduitListComponent', () => {
  let component: DevisProduitListComponent;
  let fixture: ComponentFixture<DevisProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
