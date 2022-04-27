import { FakeLoginPageComponent } from './../fake-login-page/fake-login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './../signup/signup.component';
import { LoginPageComponent } from './../login-page/login-page.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AuthguardService } from 'src/app/core/guard-service/authguard.service';
import { FakeSignupPageComponent } from './../fake-signup-page/fake-signup-page.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CustomValidationComponent } from '../custom-validation/custom-validation.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignupComponent,
    FakeSignupPageComponent,
    FakeLoginPageComponent,
    CustomValidationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
  ],
  providers: [AuthguardService],
  exports: [
    LoginPageComponent,
    SignupComponent,
    FakeSignupPageComponent,
    FakeLoginPageComponent,
    CustomValidationComponent,
  ],
})
export class AuthenticationModule {}
