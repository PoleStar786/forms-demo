import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthguardService } from '../authguard.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthguardService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-page']);
    }
  }

  accounts: User[] = [
    {
      username: 'dhruv1122',
      password: '1234',
    },

    {
      username: 'janak1324',
      password: 'janak1923',
    },

    {
      username: 'morbius99',
      password: 'TheSuperHero1',
    },
  ];

  hide = true;
  user = 'true';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBarOnFailure() {
    this._snackBar.open(`User doesn't exists! 🤨`, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['failure-snackbar'],
    });
  }

  onSubmit(form: NgForm) {
    if (this.accounts.some((el) => el.username === form.value.username)) {
      this.router.navigate(['/home-page']);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      this.openSnackBarOnFailure();
    }

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
}

// To run json server: json-server --watch db.json
