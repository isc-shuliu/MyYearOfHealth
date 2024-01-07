import { Component } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UserInfoViewComponent],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent {
  constructor(private router: Router) {}
  public setData(data: any) {
    console.log(data);
    this.router.navigate(['/choice']);
  }
}
