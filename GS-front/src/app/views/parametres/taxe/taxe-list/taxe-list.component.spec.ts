import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeListComponent } from './taxe-list.Component';

describe('TaxeListComponent', () => {
  let component: TaxeListComponent;
  let fixture: ComponentFixture<TaxeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
