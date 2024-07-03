import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeCreateComponent } from './user-create.component';

describe('BonCommandeCreateComponent', () => {
  let component: BonCommandeCreateComponent;
  let fixture: ComponentFixture<BonCommandeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonCommandeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
