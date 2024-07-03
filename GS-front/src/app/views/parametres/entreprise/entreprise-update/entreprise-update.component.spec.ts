import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseCreateComponent } from './user-create.component';

describe('EntrepriseCreateComponent', () => {
  let component: EntrepriseCreateComponent;
  let fixture: ComponentFixture<EntrepriseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
