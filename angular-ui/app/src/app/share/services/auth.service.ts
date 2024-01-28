import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { Router } from '@angular/router';
import { environmentAPI } from '../../../environment/env.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<string>('');

  public user$: Observable<string> = this.user.asObservable();

  public isLoggedIn$: Observable<boolean>;

  public isLoggedOut$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = this.storage.getUserID();
    if (user) {
      this.user.next(user);
    }
  }

  signIn(phone: string) {
    const body = { phone: phone };
    return this.httpClient
      .post<{ userId: string }>(environmentAPI.apiUrl + 'user', body)
      .pipe(
        tap((data) => this.getCurrentUser(data.userId)),
        shareReplay()
      );
  }

  getCurrentUser(userId: string) {
    if (userId == '') {
      this.storage.clean();
      this.user.next('');
      this.router.navigate(['/auth']);
    } else {
      this.storage.saveUserID(userId);
      this.user.next(userId);
      this.goToApp();
    }
  }

  public logout(): void {
    this.storage.clean();
    this.user.next('');
    this.router.navigate(['/auth']);
  }

  private goToApp(): void {
    this.router.navigate(['/welcome']);
  }
}
