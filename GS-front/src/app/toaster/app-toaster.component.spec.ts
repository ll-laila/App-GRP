import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToasterComponent } from './app-toaster.component';

describe('ToasterComponent', () => {
  let component: AppToasterComponent;
  let fixture: ComponentFixture< AppToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
