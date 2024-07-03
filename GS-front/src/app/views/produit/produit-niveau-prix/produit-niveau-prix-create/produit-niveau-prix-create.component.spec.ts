import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitNiveauPrixCreateComponent } from './user-create.component';

describe('ProduitNiveauPrixCreateComponent', () => {
  let component: ProduitNiveauPrixCreateComponent;
  let fixture: ComponentFixture<ProduitNiveauPrixCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitNiveauPrixCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitNiveauPrixCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
