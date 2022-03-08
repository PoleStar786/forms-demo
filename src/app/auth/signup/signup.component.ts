import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      email: [''],
      password: [''],
      mobile: [''],
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
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
