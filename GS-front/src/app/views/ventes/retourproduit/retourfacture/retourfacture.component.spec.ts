import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourfactureComponent } from './retourfacture.component';

describe('RetourfactureComponent', () => {
  let component: RetourfactureComponent;
  let fixture: ComponentFixture<RetourfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourfactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetourfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
