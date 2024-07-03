import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeListComponent } from './employe-list.Component';

describe('EmployeListComponent', () => {
  let component: EmployeListComponent;
  let fixture: ComponentFixture<EmployeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
