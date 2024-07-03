import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauStockCreateComponent } from './user-create.component';

describe('NiveauStockCreateComponent', () => {
  let component: NiveauStockCreateComponent;
  let fixture: ComponentFixture<NiveauStockCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauStockCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauStockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
