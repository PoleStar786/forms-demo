import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './authguard.service';

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
