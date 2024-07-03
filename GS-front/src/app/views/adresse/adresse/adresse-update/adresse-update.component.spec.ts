import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseCreateComponent } from './user-create.component';

describe('AdresseCreateComponent', () => {
  let component: AdresseCreateComponent;
  let fixture: ComponentFixture<AdresseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
