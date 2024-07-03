import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisPdfComponent } from './devis-pdf.component';

describe('DevisPdfComponent', () => {
  let component: DevisPdfComponent;
  let fixture: ComponentFixture<DevisPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
