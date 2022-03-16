import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/shared-services/apis/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  isLoggedIn!: boolean;
  constructor(private api: ApiService) {}

  getToken() {
    this.isLoggedIn = !!sessionStorage.getItem('isLoggedIn');
    this.api.toggleHF.next(this.isLoggedIn);
    return this.isLoggedIn;
  }
}
