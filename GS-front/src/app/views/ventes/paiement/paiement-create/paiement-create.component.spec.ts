import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementCreateComponent } from './user-create.component';

describe('PaiementCreateComponent', () => {
  let component: PaiementCreateComponent;
  let fixture: ComponentFixture<PaiementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
