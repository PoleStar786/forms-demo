import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthguardService } from 'src/app/core/guard-service/authguard.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  stateAlert: string;

  public signUpForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthguardService,
    private _snackBar: SnackbarAlertService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      fullName: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
  }

  get fullName() {
    return this.signUpForm.get('fullName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get mobile() {
    return this.signUpForm.get('mobile');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  getErrorMessageFullname() {
    return 'You must enter full name!';
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'You must enter E-mail!';
    }

    return this.email?.hasError('email') ? 'Not a valid E-mail!' : '';
  }

  getErrorMessageMobile() {
    if (this.mobile?.hasError('required')) {
      return 'You must enter mobile number!';
    } else if (this.mobile?.hasError('minlength')) {
      return 'Enter 10 digit number!';
    }

    return this.mobile?.hasError('pattern') ? 'Please, Enter digits only!' : '';
  }

  getErrorMessagePassword() {
    return 'You must enter password!';
  }

  signUp() {
    this.http
      .post<UserModel>(
        'http://localhost:3000/signupUsers',
        this.signUpForm.value
      )
      .subscribe(
        (res) => {
          this.stateAlert = 'SS'; // SignUp Successful
          this._snackBar.openSnackBar(this.stateAlert);
          this.signUpForm.reset();
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
