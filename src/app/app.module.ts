import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationModule } from './auth/authentication/authentication.module';
import { MaterialModule } from './shared/material/material.module';
import { FeaturesModule } from './layout/features/features.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    FlexLayoutModule,
    MatSidenavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [MaterialModule],
  providers: [],
  // in order to call one component in another we need to add that component in providers (ask why?)
  bootstrap: [AppComponent],
})
export class AppModule {}
