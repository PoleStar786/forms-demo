import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthenticationModule } from './auth/authentication/authentication.module';
import { FeaturesModule } from './layout/features/features.module';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AuthenticationModule,
    FeaturesModule,
    MaterialModule,
  ],
  exports: [MaterialModule],
  providers: [],
  // in order to call one component in another we need to add that component in providers (ask why?)
  bootstrap: [AppComponent],
})
export class AppModule {}
