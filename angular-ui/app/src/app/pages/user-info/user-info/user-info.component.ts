import { Component, OnInit } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../share/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoViewComponent],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  public user$: Observable<string>;

  public setUserSettings(data: any) {
    console.log(data);
    this.router.navigate(['/choice']);
  }

  private loadUserData(): void {
    this.user$ = this.auth.user$;
  }
}
