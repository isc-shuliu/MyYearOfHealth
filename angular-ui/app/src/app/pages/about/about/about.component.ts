import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutViewComponent } from '../about-view/about-view.component';
import { Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { AuthService } from '../../../share/services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutViewComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public userId: string;

  public isUserLogin$: Observable<boolean> = of(false);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.ckeckIsLogin();
  }

  private ckeckIsLogin() {
    this.authService.isLoggedIn$
      .pipe(
        map((res) => {
          this.isUserLogin$ = of(res);
        })
      )
      .subscribe();
  }
}
