import { Component } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UserInfoViewComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {}
