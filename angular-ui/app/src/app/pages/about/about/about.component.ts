import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutViewComponent } from '../about-view/about-view.component';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/share/services/auth.service';
// import { Router } from '@angular/router';
// import { Observable, map, of } from 'rxjs';
// import { LocalStorageService } from 'src/app/share/services/localStorage.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutViewComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public userId: string;

  // public isUserLogin$: Observable<boolean> = of(false);

  // public isUserLogout$: Observable<boolean>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.ckeckIsLogin();
  }

  private ckeckIsLogin() {
    this.auth.isLoggedIn$
      .pipe(
        map((res) => {
          this.isUserLogin$ = of(res);
        })
      )
      .subscribe();
  }

  public goToLoginPage(event: Event): void {
    console.log(event);
    this.router.navigate(['/auth']);
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }
}
