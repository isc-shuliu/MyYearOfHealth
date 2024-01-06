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
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  public currentUser$: Observable<any>;

  public onSignin(signinForm: IUserAuth): void {
    // this.currentUser$ = this.auth.signIn(signinForm).pipe(
    //   map((data) => data),
    //   catchError((error: any) => {
    //     tap(() => this.goToApp());
    //     return throwError(() => error);
    //   })
    // );
  }

  private goToApp(): void {
    console.log('user-info');
    this.router.navigate(['/user-info']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signup']);
  }

  public onGoToAboutPage() {
    this.router.navigate(['/about']);
  }
}
