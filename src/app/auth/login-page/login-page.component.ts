import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { AuthguardService } from '../../core/guard-service/authguard.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';
import { UserModel } from 'src/app/core/models/user-dashboard.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  st: string;

  stateAlert: string;
  cantDelete: number;

  isCheck = false;

  constructor(
    private router: Router,
    private authService: AuthguardService,
    private _snackBar: SnackbarAlertService,
    private api: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
  }

  onlyDigits(event: { charCode: number }) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  // toggleView() {
  //   console.log(this.isCheck);
  // (click)="toggleView()"
  // }

  onSubmit(form: NgForm) {
    let tempUser;
    this.http.get<UserModel[]>('http://localhost:3000/posts').subscribe(
      (res) => {
        const user = res.find((userFields: UserModel) => {
          if (!this.isCheck) {
            tempUser =
              userFields.email === form.value.email &&
              userFields.password === form.value.password;
          } else {
            tempUser =
              userFields.mobile === form.value.mobile &&
              userFields.password === form.value.password;
          }

          return tempUser;
        });

        if (user) {
          form.reset();
          this.router.navigate(['/home-page']);

          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.api.userNameSub$.next(user);

          localStorage.setItem('isLoggedIn', 'true');
        } else {
          this.stateAlert = 'UDE'; // User doesn't exists!
          this._snackBar.openSnackBar(this.stateAlert);
        }
      },
      (_err) => {
        this.stateAlert = 'SWW'; // Something went wrong
        this._snackBar.openSnackBar(this.stateAlert);
      }
    );

    // if (this.accounts.some((el) => el.username === form.value.username)) {
    //   this.router.navigate(['/home-page']);
    //   localStorage.setItem('isLoggedIn', 'true');
    // } else {
    //   this.openSnackBarOnFailure();
    // }

    // method - 1
    // let status = this.accounts.includes(user);

    // method - 2
    // this.accounts.forEach((ele) => {
    //   if (ele === user) {
    //     console.log(true);
    //   } else {
    //     console.log(false);
    //   }
    // });

    // console.log(status);
    // if(user.username === this.accounts[]){}
  }

  goToSignUp() {
    this.router.navigate(['/signup-page']);
  }
}

/* reactive form */
// this.loginForm = this.formBuilder.group({
//   email: [''],
//   password: [''],
// });

/////////////////////////////////////////////////
// login() {
//   this.http.get<UserMpdel[]>('http://localhost:3000/posts').subscribe(
//     (res) => {
//       const user = res.find((userFields: UserModel) => {
//         return (
//           userFields.email === this.loginForm.value.email &&
//           userFields.password === this.loginForm.value.password
//         );
//       });
//       if (user) {
//         alert('Login Success');
//         this.loginForm.reset();
//         this.router.navigate(['/home-page']);
//         localStorage.setItem('isLoggedIn', 'true');
//       } else {
//         alert('Login failed.');
//       }
//     },
//     (err) => {
//       alert('Something Went Wrong.');
//     }
//   );
// }

// accounts: User[] = [
//   {
//     username: 'dhruv1122',
//     password: '1234',
//   },

//   {
//     username: 'janak1324',
//     password: 'janak1923',
//   },

//   {
//     username: 'morbius99',
//     password: 'TheSuperHero1',
//   },
// ];
