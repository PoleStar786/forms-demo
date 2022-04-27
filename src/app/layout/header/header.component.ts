import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  startTime: number;
  endTime: number;

  constructor(
    private router: Router,
    private api: ApiService,
    public dialogBox: MatDialog
  ) {}

  toggleView() {
    this.api.toggleView$.next(this.isChecked);
  }

  logout() {
    this.endTime = Date.now();
    const timeDuration = this.endTime - this.startTime;
    let splitTimeStamp = new Date(timeDuration)
      .toLocaleString('en-GB', {
        timeZone: 'UTC',
      })
      .split(', ');

    let lastTimeStamp = splitTimeStamp[1].split(':');

    if (lastTimeStamp[0] !== '00') {
      alert(
        `The Session's duration was: ${lastTimeStamp[0]} hours, ${lastTimeStamp[1]} minutes and ${lastTimeStamp[2]} seconds.`
      );
    } else if (lastTimeStamp[1] !== '00') {
      alert(
        `The Session's duration was: ${lastTimeStamp[1]} minutes and ${lastTimeStamp[2]} seconds.`
      );
    } else {
      alert(`The Session's duration was: ${lastTimeStamp[2]} seconds.`);
    }

    localStorage.clear();
    this.router.navigate(['login-page']);
  }

  ngOnInit(): void {
    this.loggedUserUnsubscribe = this.api.userNameSub$.subscribe((v) => {
      this.loggedUserName = v.firstName;
    });

    this.startTime = Date.now();
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
