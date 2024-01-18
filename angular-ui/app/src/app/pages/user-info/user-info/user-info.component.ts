import { Component, OnInit } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../share/services/localStorage.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoViewComponent],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  constructor(
    private router: Router,
    public storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  public user$: Observable<any>;

  public setUserSettings(data: any) {
    console.log(data);
    this.router.navigate(['/choice']);
  }

  private loadUserData(): void {
    this.user$ = of(this.storage.getUserData());
  }
}
