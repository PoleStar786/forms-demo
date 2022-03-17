import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FakeSignupPageComponent } from '../fake-signup-page/fake-signup-page.component';

const routes: Routes = [{ path: '', component: FakeSignupPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
