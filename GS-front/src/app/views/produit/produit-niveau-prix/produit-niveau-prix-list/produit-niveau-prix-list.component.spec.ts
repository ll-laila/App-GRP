import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitNiveauPrixListComponent } from './produit-niveau-prix-list.Component';

describe('ProduitNiveauPrixListComponent', () => {
  let component: ProduitNiveauPrixListComponent;
  let fixture: ComponentFixture<ProduitNiveauPrixListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitNiveauPrixListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitNiveauPrixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
