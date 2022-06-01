import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/core/models/user-dashboard.model';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private api: ApiService, public dialogBox: MatDialog) {}

  loggedInUser: string = localStorage.getItem('loggedInUser') || '{}';
  loggedUserFirstName: string;
  loggedUserLastName: string;
  loggedUserEmail: string;
  loggedUserMobile: string;
  loggedUserAge: string;
  loading: boolean = true;
  dialogRef: MatDialogRef<ImageUploaderComponent>;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loggedUserFirstName = JSON.parse(this.loggedInUser).firstName;
    this.loggedUserLastName = JSON.parse(this.loggedInUser).lastName;
    this.loggedUserEmail = JSON.parse(this.loggedInUser).email;
    this.loggedUserMobile = JSON.parse(this.loggedInUser).mobile;
    this.loggedUserAge = JSON.parse(this.loggedInUser).age;
    this.loading = false;
  }

  openUploadBox() {
    this.dialogBox.open(ImageUploaderComponent, {
      width: 'auto',
    });
  }
}
