import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-custom-validation',
  templateUrl: './custom-validation.component.html',
  styleUrls: ['./custom-validation.component.scss'],
})
export class CustomValidationComponent implements OnInit {
  public customForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.customForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  get formControl() {
    return this.customForm.controls;
  }

  onLogin(): void {
    let tempUser: boolean;
    this.submitted = true;
    const email = this.customForm.controls['email'].value;
    const mobile = this.customForm.controls['mobile'].value;
    const password = this.customForm.controls['password'].value;

    console.log(email, mobile, password);
    console.log(this.customForm.value.email);

    if (this.customForm.valid) {
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
            this.customForm.reset();
            this.router.navigate(['/home-page']);
            this.customForm.reset();
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
