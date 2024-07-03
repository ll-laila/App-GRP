import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeProduitListComponent } from './bon-commande-produit-list.Component';

describe('BonCommandeProduitListComponent', () => {
  let component: BonCommandeProduitListComponent;
  let fixture: ComponentFixture<BonCommandeProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
