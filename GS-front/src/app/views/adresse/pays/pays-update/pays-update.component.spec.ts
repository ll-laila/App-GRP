import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysCreateComponent } from './user-create.component';

describe('PaysCreateComponent', () => {
  let component: PaysCreateComponent;
  let fixture: ComponentFixture<PaysCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaysCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaysCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
