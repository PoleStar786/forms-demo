import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guard/authentication.guard';

import { LoginPageComponent } from './auth/login-page/login-page.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { MapComponent } from './layout/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  {
    path: 'fake',
    loadChildren: () =>
      import('./auth/authentication/authentication.module').then(
        (i) => i.AuthenticationModule
      ),
  },
  {
    path: 'signup-page',
    loadChildren: () =>
      import('./auth/authentication/authentication.module').then(
        (i) => i.AuthenticationModule
      ),
    // component: FakeSignupPageComponent,
  },
  {
    path: 'fake-page',
    component: SignupComponent,
  },
  {
    path: 'home-page',
    // component: HomePageComponent,
    loadChildren: () =>
      import('./layout/features/features.module').then((i) => i.FeaturesModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/features/features.module').then((i) => i.FeaturesModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'ggl-map',
    component: MapComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
