import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor() {
    const saved = localStorage.getItem('isLoggedIn');
    this.loggedIn = saved === 'true';
  }

  login() {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
