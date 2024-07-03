import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonProduitCreateComponent } from './user-create.component';

describe('LivraisonProduitCreateComponent', () => {
  let component: LivraisonProduitCreateComponent;
  let fixture: ComponentFixture<LivraisonProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivraisonProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
