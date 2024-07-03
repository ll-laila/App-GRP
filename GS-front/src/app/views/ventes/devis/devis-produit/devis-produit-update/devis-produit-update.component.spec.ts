import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisProduitCreateComponent } from './user-create.component';

describe('DevisProduitCreateComponent', () => {
  let component: DevisProduitCreateComponent;
  let fixture: ComponentFixture<DevisProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
