import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-fake-login-page',
  templateUrl: './fake-login-page.component.html',
  styleUrls: ['./fake-login-page.component.scss'],
})
export class FakeLoginPageComponent implements OnInit {
  public loginFormValue: FormGroup;
  public submitted = false;

  isMail = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginFormValue = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      mobile: [''],
      password: ['', [Validators.required]],
    });
  }

  toggleChange(event: { checked: boolean }) {
    if (event.checked) {
      this.loginFormValue.controls['email'].addValidators([
        Validators.email,
        Validators.required,
      ]);
      this.loginFormValue.controls['mobile'].clearValidators();
    } else {
      this.loginFormValue.controls['mobile'].addValidators([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]);
      this.loginFormValue.controls['email'].clearValidators();
    }

    this.loginFormValue.controls['mobile'].updateValueAndValidity();
    this.loginFormValue.controls['email'].updateValueAndValidity();
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  get formControl() {
    return this.loginFormValue.controls;
  }

  onLogin(): void {
    let tempUser: boolean;
    this.submitted = true;
    const email = this.loginFormValue.controls['email'].value;
    const mobile = this.loginFormValue.controls['mobile'].value;
    const password = this.loginFormValue.controls['password'].value;

    console.log(email, mobile, password);
    console.log(this.loginFormValue.valid);

    if (this.loginFormValue.valid) {
      this.http.get<UserModel[]>('http://localhost:3000/posts').subscribe(
        (res) => {
          const user = res.find((userFields: UserModel) => {
            if (email) {
              tempUser =
                userFields.email === email && userFields.password === password;
            } else if (mobile) {
              tempUser =
                userFields.mobile === mobile &&
                userFields.password === password;
            }

            return tempUser;
          });

          console.log(tempUser);

          if (user) {
            this.loginFormValue.reset();
            this.router.navigate(['/home-page']);
            this.loginFormValue.reset();
          } else {
            console.log('user does not exists');
          }
        },
        (_err) => {
          console.log('something went wrong');
        }
      );
    }
  }
}
