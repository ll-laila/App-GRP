import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourProduitListComponent } from './retour-produit-list.Component';

describe('RetourProduitListComponent', () => {
  let component: RetourProduitListComponent;
  let fixture: ComponentFixture<RetourProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetourProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
