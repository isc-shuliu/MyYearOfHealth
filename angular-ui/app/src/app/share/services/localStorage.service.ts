import { Injectable } from '@angular/core';

enum DATA {
  CURRENT_USER = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public clean(): void {
    localStorage.clear();
  }

  public saveUser(user: string): void {
    console.log(user);
    localStorage.removeItem(DATA.CURRENT_USER);
    localStorage.setItem(DATA.CURRENT_USER, JSON.stringify(user));
  }

  public getUser(): string {
    const user = localStorage.getItem(DATA.CURRENT_USER);
    console.log(user);

    if (user) {
      return JSON.parse(user);
    }

    return '';
  }
}
