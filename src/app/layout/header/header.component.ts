import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: string = localStorage.getItem('loggedInUser') || '{}';
  loggedUserName: string = JSON.parse(this.loggedInUser).firstName;

  loggedUserUnsubscribe: Subscription;
  isChecked = true;

  constructor(
    private router: Router,
    private api: ApiService,
    public dialogBox: MatDialog
  ) {}

  toggleView() {
    this.api.toggleView$.next(this.isChecked);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login-page']);
  }

  ngOnInit(): void {
    this.loggedUserUnsubscribe = this.api.userNameSub$.subscribe((v) => {
      this.loggedUserName = v.firstName;
    });
  }

  ngOnDestroy(): void {
    this.loggedUserUnsubscribe.unsubscribe();
  }

  addNewUser() {
    this.dialogBox.open(SignupComponent, {
      width: 'auto',
    });
  }

  goToUserDetails() {
    this.router.navigate(['/user-details-page/users-table']);
  }
}
