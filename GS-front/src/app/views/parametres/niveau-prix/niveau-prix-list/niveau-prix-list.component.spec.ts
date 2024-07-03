import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauPrixListComponent } from './niveau-prix-list.Component';

describe('NiveauPrixListComponent', () => {
  let component: NiveauPrixListComponent;
  let fixture: ComponentFixture<NiveauPrixListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauPrixListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NiveauPrixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
