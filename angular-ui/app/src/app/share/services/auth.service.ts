import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { IUserAuth } from '../interfaces/auth';
import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../../environment/env';
// import { environment } from 'src/environment/env';

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

    const user = this.storage.getUser();
    console.log(user);
    if (user) {
      console.log(user);
      this.user.next(user);
    }
  }

  signIn(userform: any) {
    console.log(userform);

    // return this.httpClient
    //   .post<IToken>(environment.apiUrl + 'auth/sign-in', user)
    //   .pipe(
    //     tap(() => this.getCurrentUser().subscribe()),
    //     shareReplay()
    //   );
    const user = { username: 'Sammy Snake', sex: 'f', age: '30' };
    this.getCurrentUser(user.username);
  }

  getCurrentUser(user: any) {
    this.storage.saveUser(user);
    this.user.next(user);
    this.goToApp();
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
