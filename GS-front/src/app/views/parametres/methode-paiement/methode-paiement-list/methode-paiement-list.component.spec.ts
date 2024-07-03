import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodePaiementListComponent } from './methode-paiement-list.Component';

describe('MethodePaiementListComponent', () => {
  let component: MethodePaiementListComponent;
  let fixture: ComponentFixture<MethodePaiementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodePaiementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MethodePaiementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
