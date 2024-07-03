import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourProduitCreateComponent } from './user-create.component';

describe('RetourProduitCreateComponent', () => {
  let component: RetourProduitCreateComponent;
  let fixture: ComponentFixture<RetourProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
