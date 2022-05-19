import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeLoginPageComponent } from './fake-login-page.component';

describe('FakeLoginPageComponent', () => {
  let component: FakeLoginPageComponent;
  let fixture: ComponentFixture<FakeLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
