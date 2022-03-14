import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from '../login-page/login-page.component';
import { SignupComponent } from './../signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { AuthguardService } from 'src/app/core/guard-service/authguard.service';
import { FakeSignupPageComponent } from '../fake-signup-page/fake-signup-page.component';

@NgModule({
  declarations: [LoginPageComponent, SignupComponent, FakeSignupPageComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [AuthguardService],
  exports: [LoginPageComponent, SignupComponent, FakeSignupPageComponent],
})
export class AuthenticationModule {}
