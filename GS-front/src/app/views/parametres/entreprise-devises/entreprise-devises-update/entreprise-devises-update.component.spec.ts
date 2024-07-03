import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseDevisesCreateComponent } from './user-create.component';

describe('EntrepriseDevisesCreateComponent', () => {
  let component: EntrepriseDevisesCreateComponent;
  let fixture: ComponentFixture<EntrepriseDevisesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseDevisesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseDevisesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
