import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureCreateComponent } from './user-create.component';

describe('FactureCreateComponent', () => {
  let component: FactureCreateComponent;
  let fixture: ComponentFixture<FactureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
