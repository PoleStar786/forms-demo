import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';

import { HomePageComponent } from './layout/home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { FakeSignupPageComponent } from './auth/fake-signup-page/fake-signup-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'signup-page', component: FakeSignupPageComponent },
  { path: 'fake-page', component: SignupComponent },
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
