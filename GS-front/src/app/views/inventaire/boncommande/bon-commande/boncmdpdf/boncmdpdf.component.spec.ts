import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoncmdpdfComponent } from './boncmdpdf.component';

describe('BoncmdpdfComponent', () => {
  let component: BoncmdpdfComponent;
  let fixture: ComponentFixture<BoncmdpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoncmdpdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoncmdpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
