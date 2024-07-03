import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisAutreComponent } from './devis-autre.component';

describe('DevisAutreComponent', () => {
  let component: DevisAutreComponent;
  let fixture: ComponentFixture<DevisAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisAutreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
