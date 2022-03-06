import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

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

  user = 'true';

  onSubmit(form: NgForm) {
    if (this.accounts.some((el) => el.username === form.value.username)) {
      this.router.navigate(['home-page']);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      console.log('user does not exists.');
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

  ngOnInit(): void {}
}
