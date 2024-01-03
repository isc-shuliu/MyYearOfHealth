import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {
  public isUser: boolean = false;
  ngOnInit(): void {}
  // @Input() isUserLogout: boolean | null;

  // @Input() isUserLogin: boolean | null;

  // @Input() user: string | null;
}
