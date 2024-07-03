import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonProduitListComponent } from './livraison-produit-list.Component';

describe('LivraisonProduitListComponent', () => {
  let component: LivraisonProduitListComponent;
  let fixture: ComponentFixture<LivraisonProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
