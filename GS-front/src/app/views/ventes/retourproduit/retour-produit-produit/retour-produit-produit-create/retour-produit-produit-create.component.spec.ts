import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourProduitProduitCreateComponent } from './user-create.component';

describe('RetourProduitProduitCreateComponent', () => {
  let component: RetourProduitProduitCreateComponent;
  let fixture: ComponentFixture<RetourProduitProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourProduitProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourProduitProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
