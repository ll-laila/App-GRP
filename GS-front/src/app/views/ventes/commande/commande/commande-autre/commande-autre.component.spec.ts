import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeAutreComponent } from './commande-autre.component';

describe('CommandeAutreComponent', () => {
  let component: CommandeAutreComponent;
  let fixture: ComponentFixture<CommandeAutreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeAutreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
