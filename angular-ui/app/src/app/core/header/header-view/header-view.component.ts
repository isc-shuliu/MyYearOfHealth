import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from '../../../components/header-menu/header-menu-page/header-menu.component';

@Component({
  selector: 'app-header-view',
  standalone: true,
  imports: [CommonModule, HeaderMenuComponent],
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {
  public isUser: boolean = false;
  ngOnInit(): void {
    console.log(this.isUserLogin, this.isUserLogout, this.user);
  }
  @Input() isUserLogout: boolean | null;

  @Input() isUserLogin: boolean | null;

  @Input() user: string | null;
}
