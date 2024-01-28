import { Component } from '@angular/core';
import { tap, catchError, throwError, Observable, map } from 'rxjs';
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

  public onSignin(signinForm: { phone: string }): void {
    const phone = signinForm.phone;
    this.auth
      .signIn(phone)
      .pipe(
        map((data) => this.checkStorage(data)),
        catchError((error: any) => {
          return throwError(() => error);
        })
      )
      .subscribe();
    this.router.navigate(['/welcome']);
  }

  private checkStorage(response: any) {
    if (!response) this.formError = true;
  }
}
