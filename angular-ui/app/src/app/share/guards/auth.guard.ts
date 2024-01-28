import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localStorage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authStore: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authStore.user.value;

    if (user) {
      return true;
    } else {
      this.localStorage.clean();
      this.router.navigate(['/auth']);
    }
    return false;
  }
}
