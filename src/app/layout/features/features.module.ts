import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../home-page/home-page.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DeleteConfirmationDialogComponent } from '../home-page/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
  ],
})
export class FeaturesModule {}
