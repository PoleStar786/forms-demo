import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MaterialModule } from './../../shared/material/material.module';

import { EditFormComponent } from './../home-page/edit-form/edit-form.component';
import { DeleteConfirmationDialogComponent } from './../home-page/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';
import { HomePageComponent } from './../home-page/home-page.component';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    MatSidenavModule,
    FormsModule,
  ],
  exports: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
    EditFormComponent,
  ],
})
export class FeaturesModule {}
