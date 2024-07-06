import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  private username: string | undefined ;

  private readonly USERNAME_KEY = 'username';
  constructor() { }

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string {
    return localStorage.getItem(this.USERNAME_KEY) || '';
  }

  clearUsername() {
    localStorage.removeItem(this.USERNAME_KEY);
  }

}


