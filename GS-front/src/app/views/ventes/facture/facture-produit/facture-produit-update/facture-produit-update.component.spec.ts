import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProduitCreateComponent } from './user-create.component';

describe('FactureProduitCreateComponent', () => {
  let component: FactureProduitCreateComponent;
  let fixture: ComponentFixture<FactureProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
