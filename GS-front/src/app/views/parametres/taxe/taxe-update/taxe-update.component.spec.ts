import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeCreateComponent } from './user-create.component';

describe('TaxeCreateComponent', () => {
  let component: TaxeCreateComponent;
  let fixture: ComponentFixture<TaxeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
