import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  MinLengthValidator,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthguardService } from 'src/app/core/guard-service/authguard.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;

  public signUpForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthguardService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      fullName: [''],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get mobile() {
    return this.signUpForm.get('mobile');
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value!';
    }

    return this.email?.hasError('email') ? 'Not a valid E-mail!' : '';
  }

  getErrorMessageMobile() {
    if (this.mobile?.hasError('required')) {
      return 'You must enter a value!';
    } else if (this.mobile?.hasError('minlength')) {
      return 'Enter 10 digit number!';
    }

    return this.mobile?.hasError('pattern') ? 'Please, Enter digits only!' : '';
  }

  signUp() {
    this.http
      .post<any>('http://localhost:3000/signupUsers', this.signUpForm.value)
      .subscribe(
        (res) => {
          alert('SignUp Successfully!');
          this.signUpForm.reset();
          this.router.navigate(['/login-page']);
        },
        (err) => {
          alert('Something went wrong!');
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login-page']);
  }
}
