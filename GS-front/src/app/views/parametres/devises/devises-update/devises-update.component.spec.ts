import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisesCreateComponent } from './user-create.component';

describe('DevisesCreateComponent', () => {
  let component: DevisesCreateComponent;
  let fixture: ComponentFixture<DevisesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
