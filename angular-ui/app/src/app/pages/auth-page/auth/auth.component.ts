import { Component } from '@angular/core';
import { tap, catchError, throwError, Observable, map } from 'rxjs';
import { IUserAuth } from '../../../share/interfaces/auth.interface';
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

  public formError: boolean = false;

  public onSignin(signinForm: IUserAuth): void {
    const telecom = signinForm.telecom.trim();
    this.auth
      .signIn(telecom)
      .pipe(
        map((data) => this.checkStorage(data)),
        tap((data) => console.log(data)),
        catchError((error: any) => {
          return throwError(() => error);
        })
      )
      .subscribe();
    this.router.navigate(['/welcome']);
  }

  private checkStorage(response: any) {
    const user = this.auth.user.value;
    if (!user) this.formError = true;
  }
}
