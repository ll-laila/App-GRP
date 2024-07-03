import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeProduitCreateComponent } from './user-create.component';

describe('CommandeProduitCreateComponent', () => {
  let component: CommandeProduitCreateComponent;
  let fixture: ComponentFixture<CommandeProduitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeProduitCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeProduitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
