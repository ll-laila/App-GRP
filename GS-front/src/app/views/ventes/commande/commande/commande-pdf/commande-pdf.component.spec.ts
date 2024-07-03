import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePdfComponent } from './commande-pdf.component';

describe('CommandePdfComponent', () => {
  let component: CommandePdfComponent;
  let fixture: ComponentFixture<CommandePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
