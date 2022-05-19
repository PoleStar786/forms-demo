import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeSignupPageComponent } from './fake-signup-page.component';

describe('FakeSignupPageComponent', () => {
  let component: FakeSignupPageComponent;
  let fixture: ComponentFixture<FakeSignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeSignupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
