import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class HeaderMenuViewComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.isUserLogin);
  }

  @Input() isUserLogin: boolean | null;

  @Input() isUserLogout: boolean | null;

  @Output() logout = new EventEmitter<any>();

  public goToAboutPage() {
    this.router.navigate(['/about']);
  }

  public menuPage() {
    this.router.navigate(['/choice']);
  }

  public logIn() {
    this.router.navigate(['/autn']);
  }

  public userLogout() {
    this.logout.emit();
  }
}
