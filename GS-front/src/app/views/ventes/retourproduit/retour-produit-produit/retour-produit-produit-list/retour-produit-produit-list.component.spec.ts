import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourProduitProduitListComponent } from './retour-produit-produit-list.Component';

describe('RetourProduitProduitListComponent', () => {
  let component: RetourProduitProduitListComponent;
  let fixture: ComponentFixture<RetourProduitProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourProduitProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetourProduitProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
