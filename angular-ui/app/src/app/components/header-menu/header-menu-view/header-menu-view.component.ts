import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu-view',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './header-menu-view.component.html',
  styleUrl: './header-menu-view.component.scss'
})
export class HeaderMenuViewComponent {
  constructor(private router: Router) {}

  @Input() isUserLogin: boolean | null;

  @Input() isUserLogout: boolean | null;

  @Output() logout = new EventEmitter<any>();

  public goToAboutPage() {
    this.router.navigate(['/about']);
  }

  public menuPage() {
    this.router.navigate(['/menu']);
  }

  public logIn() {
    this.router.navigate(['/autn']);
  }

  public userInfo() {
    this.router.navigate(['/user-info']);
  }

  public measurement() {
    this.router.navigate(['/data-results']);
  }

  public planCare() {
    this.router.navigate(['/description-plan']);
  }

  public userLogout() {
    this.logout.emit();
  }

  public trackerHabbits() {
    this.router.navigate(['/tracker-calendar']);
  }

  public changeYourHabbits() {
    this.router.navigate(['/create-own-plan']);
  }
}
