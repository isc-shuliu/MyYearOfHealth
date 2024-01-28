import { Injectable } from '@angular/core';

enum DATA {
  USER_ID = 'userID'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public clean(): void {
    localStorage.clear();
  }

  public saveUserID(user: any): void {
    localStorage.clear();
    localStorage.setItem(DATA.USER_ID, JSON.stringify(user));
  }

  public getUserID(): string {
    const user = localStorage.getItem(DATA.USER_ID);

    if (user) {
      return JSON.parse(user);
    }

    return '';
  }
}
