import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/core/models/user-dashboard.model';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  formValue: FormGroup;
  showAdd: boolean;
  showUpdate: boolean;
  userModelObj: UserModel = new UserModel();
  stateAlert: string;
  userData: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: SnackbarAlertService,
    @Inject(MAT_DIALOG_DATA) public editData: UserModel,
    public dialogRef: MatDialogRef<EditFormComponent>
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    if (this.editData) {
      this.formValue.controls['firstName'].setValue(this.editData.firstName);
      this.formValue.controls['lastName'].setValue(this.editData.lastName);
      this.formValue.controls['email'].setValue(this.editData.email);
      this.formValue.controls['mobile'].setValue(this.editData.mobile);
      this.formValue.controls['age'].setValue(this.editData.age);
    }
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  updateUser() {
    this.editData.firstName = this.formValue.value.firstName;
    this.editData.lastName = this.formValue.value.lastName;
    this.editData.email = this.formValue.value.email;
    this.editData.mobile = this.formValue.value.mobile;
    this.editData.age = this.formValue.value.age;

    this.api.updateUser(this.editData, this.editData.id).subscribe({
      next: (res) => {
        if (
          JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').id ===
          this.editData.id
        ) {
          this.api.userNameSub$.next(this.editData);
          sessionStorage.setItem('loggedInUser', JSON.stringify(this.editData));
        }

        this.stateAlert = 'DUS'; // Data Updated Successfully
        this._snackBar.openSnackBar(this.stateAlert);
        this.dialogRef.close();
        this.formValue.reset();
      },
      error: () => {
        'error while updating data! 🚧';
      },
    });
  }
}
