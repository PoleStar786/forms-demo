import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: string = sessionStorage.getItem('loggedInUser') || '{}';
  loggedUserName: string = JSON.parse(this.loggedInUser).firstName;
  loggedUserUnsubscribe: Subscription;

  constructor(private router: Router, private api: ApiService) {}

  logout() {
    sessionStorage.clear();
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
}
