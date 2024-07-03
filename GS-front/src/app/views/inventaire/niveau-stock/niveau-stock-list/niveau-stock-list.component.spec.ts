import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauStockListComponent } from './niveau-stock-list.Component';

describe('NiveauStockListComponent', () => {
  let component: NiveauStockListComponent;
  let fixture: ComponentFixture<NiveauStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauStockListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NiveauStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
