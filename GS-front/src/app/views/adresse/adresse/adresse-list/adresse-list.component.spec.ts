import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseListComponent } from './adresse-list.Component';

describe('AdresseListComponent', () => {
  let component: AdresseListComponent;
  let fixture: ComponentFixture<AdresseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdresseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
