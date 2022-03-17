import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthguardService } from 'src/app/core/guard-service/authguard.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-fake-signup-page',
  templateUrl: './fake-signup-page.component.html',
  styleUrls: ['./fake-signup-page.component.scss'],
})
export class FakeSignupPageComponent implements OnInit {
  // signUpFormValue: FormGroup;
  hide: boolean = true;
  stateAlert: string;

  public signUpFormValue: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthguardService,
    private _snackBar: SnackbarAlertService
  ) {}

  ngOnInit(): void {
    this.signUpFormValue = this.formbuilder.group({
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

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  signUp() {
    this.http
      .post<UserModel>(
        'http://localhost:3000/posts',
        this.signUpFormValue.value
      )
      .subscribe(
        (res) => {
          this.stateAlert = 'SS'; // SignUp Successful
          this._snackBar.openSnackBar(this.stateAlert);
          this.signUpFormValue.reset();
          this.router.navigate(['/login-page']);
        },
        (err) => {
          this.stateAlert = 'SWW'; // Something went wrong
          this._snackBar.openSnackBar(this.stateAlert);
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login-page']);
  }
}
