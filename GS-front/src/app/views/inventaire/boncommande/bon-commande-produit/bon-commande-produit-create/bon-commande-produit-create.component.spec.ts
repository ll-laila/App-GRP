import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeProduitCreateComponent } from './user-create.component';

describe('BonCommandeProduitCreateComponent', () => {
  let component: BonCommandeProduitCreateComponent;
  let fixture: ComponentFixture<BonCommandeProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonCommandeProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
