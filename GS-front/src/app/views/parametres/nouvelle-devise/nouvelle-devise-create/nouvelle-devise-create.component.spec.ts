import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleDeviseCreateComponent } from './user-create.component';

describe('NouvelleDeviseCreateComponent', () => {
  let component: NouvelleDeviseCreateComponent;
  let fixture: ComponentFixture<NouvelleDeviseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleDeviseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleDeviseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
