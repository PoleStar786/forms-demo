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
import { UserDetailsPageComponent } from '../user-details-page/user-details-page.component';
import { DtableComponent } from '../user-details-page/dtable/dtable.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { JustLoginComponent } from 'src/app/auth/just-login/just-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ImageUploaderComponent } from '../user-profile/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
    EditFormComponent,
    UserDetailsPageComponent,
    DtableComponent,
    SidenavComponent,
    JustLoginComponent,
    UserProfileComponent,
    ImageUploaderComponent,
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
    UserDetailsPageComponent,
    DtableComponent,
    SidenavComponent,
    JustLoginComponent,
    UserProfileComponent,
    ImageUploaderComponent,
  ],
})
export class FeaturesModule {}
