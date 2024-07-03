import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProduitListComponent } from './facture-produit-list.Component';

describe('FactureProduitListComponent', () => {
  let component: FactureProduitListComponent;
  let fixture: ComponentFixture<FactureProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
