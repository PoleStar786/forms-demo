import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustLoginComponent } from './just-login.component';

describe('JustLoginComponent', () => {
  let component: JustLoginComponent;
  let fixture: ComponentFixture<JustLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
