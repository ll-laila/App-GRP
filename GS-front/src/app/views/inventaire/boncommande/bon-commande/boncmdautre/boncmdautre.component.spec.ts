import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoncmdautreComponent } from './boncmdautre.component';

describe('BoncmdautreComponent', () => {
  let component: BoncmdautreComponent;
  let fixture: ComponentFixture<BoncmdautreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoncmdautreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoncmdautreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
