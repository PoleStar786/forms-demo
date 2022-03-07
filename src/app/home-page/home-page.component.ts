import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserModel } from './user-dashboard.model';

import { ApiService } from '../shared/api.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  formValue!: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      age: [''],
    });

    this.getUsers();
  }

  openSnackBarOnSuccess() {
    this._snackBar.open('User Added Successfully. 👍', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['success-snackbar'],
    });
  }

  openSnackBarOnFailure() {
    this._snackBar.open('Something went wrong! 👎', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['failure-snackbar'],
    });
  }

  openSnackBarOnDelete() {
    this._snackBar.open('User Deleted! ⚠️', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['delete-snackbar'],
    });
  }

  openSnackBarOnUpdate() {
    this._snackBar.open('Data Updated Successfully! 🤖', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['success-snackbar'],
    });
  }

  toggleButton() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.age = this.formValue.value.age;

    this.api.postUser(this.userModelObj).subscribe(
      (res) => {
        this.openSnackBarOnSuccess();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      },
      (err) => {
        this.openSnackBarOnFailure();
      }
    );
  }

  getUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
    });
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id).subscribe((res) => {
      this.openSnackBarOnDelete();
      this.getUsers();
    });
  }

  editUser(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
  }

  updateUser() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.age = this.formValue.value.age;

    this.api
      .updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        this.openSnackBarOnUpdate();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      });
  }
}
