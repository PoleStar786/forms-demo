import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-just-login',
  templateUrl: './just-login.component.html',
  styleUrls: ['./just-login.component.scss'],
})
export class JustLoginComponent implements OnInit {
  public logForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.logForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onFocus() {
    if (document.activeElement?.id === 'inputEmail') {
      this.logForm.controls['mobile'].disable();
    } else {
      this.logForm.controls['email'].disable();
    }
  }

  outFocus() {
    if (this.logForm.controls['email'].value) {
      this.logForm.controls['mobile'].disable();
    } else if (this.logForm.controls['mobile'].value) {
      this.logForm.controls['email'].disable();
    } else {
      this.logForm.controls['email'].enable();
      this.logForm.controls['mobile'].enable();
    }
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  get formControl() {
    return this.logForm.controls;
  }

  onLogin(): void {
    let tempUser: boolean;
    this.submitted = true;
    const email = this.logForm.controls['email'].value;
    const mobile = this.logForm.controls['mobile'].value;
    const password = this.logForm.controls['password'].value;

    console.log(email, mobile, password);
    console.log(this.logForm.value.email);

    if (this.logForm.valid) {
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
            this.logForm.reset();
            this.router.navigate(['/home-page']);
            this.logForm.reset();
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

/* YYYYMMDDHHMMSS(date: Date) {
    let YYYY = date.getFullYear().toString();
    let MM = this.pad(date.getMonth() + 1, 2);
    let DD = this.pad(date.getDate(), 2);
    let HH = this.pad(date.getHours(), 2);
    let mm = this.pad(date.getMinutes(), 2);

    return YYYY + MM + DD + HH + mm;
  }

  getDate() {
    let currentDate = new Date();
    // method - 01
    console.log(this.YYYYMMDDHHMMSS(currentDate));

    // method - 02
    console.log(
      currentDate.getFullYear() +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        ('0' + currentDate.getDate()).slice(-2) +
        ('0' + currentDate.getHours()).slice(-2) +
        ('0' + currentDate.getMinutes()).slice(-2)
    );
  }

  pad(number: string, length: number) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  } */
