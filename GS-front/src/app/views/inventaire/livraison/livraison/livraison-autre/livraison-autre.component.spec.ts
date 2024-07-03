import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonAutreComponent } from './livraison-autre.component';

describe('LivraisonAutreComponent', () => {
  let component: LivraisonAutreComponent;
  let fixture: ComponentFixture<LivraisonAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonAutreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
