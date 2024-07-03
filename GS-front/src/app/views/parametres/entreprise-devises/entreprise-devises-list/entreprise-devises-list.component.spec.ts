import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseDevisesListComponent } from './entreprise-devises-list.Component';

describe('EntrepriseDevisesListComponent', () => {
  let component: EntrepriseDevisesListComponent;
  let fixture: ComponentFixture<EntrepriseDevisesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseDevisesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrepriseDevisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
