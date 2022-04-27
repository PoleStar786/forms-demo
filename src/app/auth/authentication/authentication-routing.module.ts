import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomValidationComponent } from '../custom-validation/custom-validation.component';
import { FakeSignupPageComponent } from '../fake-signup-page/fake-signup-page.component';
import { JustLoginComponent } from '../just-login/just-login.component';
import { FakeLoginPageComponent } from './../fake-login-page/fake-login-page.component';

const routes: Routes = [
  { path: '', component: FakeSignupPageComponent },
  { path: 'login', component: FakeLoginPageComponent },
  { path: 'just-login', component: JustLoginComponent },
  { path: 'custom-form', component: CustomValidationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
