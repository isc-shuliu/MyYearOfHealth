import { Injectable } from '@angular/core';

enum DATA {
  USER_ID = 'userID',
  USER_NAME = 'userName',
  USER_PREFIX = 'prefix'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public clean(): void {
    localStorage.clear();
  }

  public saveUserID(user: string): void {
    console.log(user);
    localStorage.clear();
    localStorage.setItem(DATA.USER_ID, JSON.stringify(user));
  }

  public saveUserName(user: any): void {
    console.log(user);
    localStorage.removeItem(DATA.USER_NAME);
    localStorage.removeItem(DATA.USER_PREFIX);
    localStorage.setItem(DATA.USER_NAME, JSON.stringify(user.given[0]));
    localStorage.setItem(DATA.USER_PREFIX, JSON.stringify(user.prefix[0]));
  }

  public getUser(): string {
    const user = localStorage.getItem(DATA.USER_ID);
    console.log(user);

    if (user) {
      return JSON.parse(user);
    }

    return '';
  }
}
