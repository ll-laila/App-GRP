import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeProduitListComponent } from './commande-produit-list.Component';

describe('CommandeProduitListComponent', () => {
  let component: CommandeProduitListComponent;
  let fixture: ComponentFixture<CommandeProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeProduitListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
