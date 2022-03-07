import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  isLoggedIn!: boolean;
  constructor() {}

  getToken() {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    return this.isLoggedIn;
  }
}
