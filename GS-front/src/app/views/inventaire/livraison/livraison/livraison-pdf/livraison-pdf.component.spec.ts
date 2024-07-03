import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonPdfComponent } from './livraison-pdf.component';

describe('LivraisonPdfComponent', () => {
  let component: LivraisonPdfComponent;
  let fixture: ComponentFixture<LivraisonPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
