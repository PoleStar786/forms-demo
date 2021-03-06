import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthguardService } from '../guard-service/authguard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authguardService: AuthguardService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authguardService.getToken()) {
      this.router.navigateByUrl('/login-page');
    }

    return this.authguardService.getToken();
  }
}
