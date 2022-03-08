import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignupComponent } from './../signup/signup.component';
import { AuthguardService } from 'src/app/core/guard-service/authguard.service';

@NgModule({
  declarations: [LoginPageComponent, SignupComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [AuthguardService],
  exports: [LoginPageComponent, SignupComponent],
})
export class AuthenticationModule {}
