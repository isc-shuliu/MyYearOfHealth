import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../share/services/auth.service';
import { HeaderMenuViewComponent } from '../header-menu-view/header-menu-view.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [HeaderMenuViewComponent],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}
  public isUserLogin$: Observable<boolean>;

  public isUserLogout$: Observable<boolean>;

  ngOnInit(): void {
    this.ckeckIsLogin();
  }

  private ckeckIsLogin() {
    this.isUserLogin$ = this.auth.isLoggedIn$;

    this.isUserLogout$ = this.auth.isLoggedOut$;
  }

  public logout(): void {
    this.auth.logout();
  }
}
