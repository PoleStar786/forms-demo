import { User } from './../../core/interfaces/user';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';

import { AuthguardService } from '../../core/guard-service/authguard.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;

  stateAlert: string;
  cantDelete: number;

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

  onSubmit(form: NgForm) {
    this.http
      .get<any>('http://localhost:3000/posts')
      // this.api.getUser()
      .subscribe(
        (res) => {
          const user = res.find((a: User) => {
            return (
              a.email === form.value.email && a.password === form.value.password
            );
          });
          if (user) {
            form.reset();
            this.router.navigate(['/home-page']);

            localStorage.setItem('loggedInUser', JSON.stringify(user));
            this.api.userNameSub$.next(user);

            localStorage.setItem('isLoggedIn', 'true');

            // this.getUsers();
          } else {
            this.stateAlert = 'UDE'; // User doesn't exists!
            this._snackBar.openSnackBar(this.stateAlert);
          }
        },
        (err) => {
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

  // getUsers() {
  //   console.log('running......');
  //   this.api.getSubUser();
  // }

  goToSignUp() {
    this.router.navigate(['/signup-page']);
  }
}

// To run json server: json-server --watch db.json

/* reactive form */
// this.loginForm = this.formBuilder.group({
//   email: [''],
//   password: [''],
// });

/////////////////////////////////////////////////
// login() {
//   this.http.get<any>('http://localhost:3000/posts').subscribe(
//     (res) => {
//       const user = res.find((a: any) => {
//         return (
//           a.email === this.loginForm.value.email &&
//           a.password === this.loginForm.value.password
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
