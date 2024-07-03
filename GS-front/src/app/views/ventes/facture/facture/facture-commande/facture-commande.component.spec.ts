import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureCommandeComponent } from './facture-commande.component';

describe('FactureCommandeComponent', () => {
  let component: FactureCommandeComponent;
  let fixture: ComponentFixture<FactureCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
