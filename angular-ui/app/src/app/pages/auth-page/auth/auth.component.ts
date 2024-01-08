import { Component } from '@angular/core';
import { tap, catchError, throwError, Observable, map } from 'rxjs';
import { IUserAuth } from '../../../share/interfaces/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../share/services/auth.service';
import { AuthViewComponent } from '../auth-view/auth-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AuthViewComponent],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  public currentUser$: Observable<any>;

  public onSignin(signinForm: IUserAuth): void {
    console.log(signinForm);
    // this.currentUser$ = this.auth.signIn(signinForm).pipe(
    //   map((data) => data),
    //   catchError((error: any) => {
    //     tap(() => this.goToApp());
    //     return throwError(() => error);
    //   })
    // );
    this.auth.signIn(signinForm);
    this.router.navigate(['/welcome']);
  }
}
