import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserModel } from '../../core/models/user-dashboard.model';

import { ApiService } from '../../shared/shared-services/apis/api.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';

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
  stateAlert!: string;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: SnackbarAlertService
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
        this.stateAlert = 'UAS'; // UC: User Added Successfully
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      },
      (err) => {
        this.stateAlert = 'SWW'; // Something went wrong
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
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
      this.stateAlert = 'UD'; // User Deleted
      this._snackBar.openSnackBar(this.stateAlert);
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
        this.stateAlert = 'DUS'; // Data Updated Successfully
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      });
  }
}
