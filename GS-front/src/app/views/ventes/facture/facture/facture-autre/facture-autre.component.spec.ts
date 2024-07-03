import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureAutreComponent } from './facture-autre.component';

describe('FactureAutreComponent', () => {
  let component: FactureAutreComponent;
  let fixture: ComponentFixture<FactureAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureAutreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
