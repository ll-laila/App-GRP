import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauPrixCreateComponent } from './user-create.component';

describe('NiveauPrixCreateComponent', () => {
  let component: NiveauPrixCreateComponent;
  let fixture: ComponentFixture<NiveauPrixCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauPrixCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauPrixCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
