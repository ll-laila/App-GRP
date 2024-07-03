import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodePaiementCreateComponent } from './user-create.component';

describe('MethodePaiementCreateComponent', () => {
  let component: MethodePaiementCreateComponent;
  let fixture: ComponentFixture<MethodePaiementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodePaiementCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodePaiementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
