import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleDeviseListComponent } from './nouvelle-devise-list.Component';

describe('NouvelleDeviseListComponent', () => {
  let component: NouvelleDeviseListComponent;
  let fixture: ComponentFixture<NouvelleDeviseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleDeviseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouvelleDeviseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
