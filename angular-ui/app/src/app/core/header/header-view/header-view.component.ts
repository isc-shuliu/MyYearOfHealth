import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from '../../../components/header-menu/header-menu-page/header-menu.component';

@Component({
  selector: 'app-header-view',
  standalone: true,
  imports: [CommonModule, HeaderMenuComponent],
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent {
  @Input() isUserLogout: boolean | null;

  @Input() isUserLogin: boolean | null;

  @Input() user: string | null;
}
