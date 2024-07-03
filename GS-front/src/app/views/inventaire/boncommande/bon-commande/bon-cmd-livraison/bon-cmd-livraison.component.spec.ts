import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCmdLivraisonComponent } from './bon-cmd-livraison.component';

describe('BonCmdLivraisonComponent', () => {
  let component: BonCmdLivraisonComponent;
  let fixture: ComponentFixture<BonCmdLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCmdLivraisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCmdLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
