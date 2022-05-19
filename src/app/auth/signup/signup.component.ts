import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { UserModel } from 'src/app/core/models/user-dashboard.model';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  stateAlert: string;
  crew: number[] = [];

  loggedUser: string = localStorage.getItem('loggedInUser') || '{}';
  loggedUserID: number = JSON.parse(this.loggedUser).id;

  public signUpForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private _snackBar: SnackbarAlertService,
    @Inject(MAT_DIALOG_DATA) public editData: UserModel,
    public dialogRef: MatDialogRef<SignupComponent>,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  addCrew() {
    // this.http.post<UserModel>('http://localhost:3000/subUsers', this.signUpForm.value)
    this.api.postSubUser(this.signUpForm.value).subscribe(
      (res) => {
        this.crew.push(res.id);

        // this.loggedUser['crew'] = ;
        // JSON.parse(this.loggedUser)['crew'];
        let temp = JSON.parse(this.loggedUser);

        if (temp.crew.length < 0) {
          temp['crew'] = this.crew;
        } else {
          temp['crew'].push(res.id);
        }

        // set added userID to localstorage
        localStorage.setItem('loggedInUser', JSON.stringify(temp));

        // set added userID to json-server
        this.api.postID(this.loggedUserID, temp).subscribe(() => {});

        this.stateAlert = 'SS'; // SignUp Successful
        this._snackBar.openSnackBar(this.stateAlert);
        this.signUpForm.reset();
        this.api.addCrew$.next(temp);
      },
      (err) => {
        this.stateAlert = 'SWW'; // Something went wrong
        this._snackBar.openSnackBar(this.stateAlert);
      }
    );
  }
}
