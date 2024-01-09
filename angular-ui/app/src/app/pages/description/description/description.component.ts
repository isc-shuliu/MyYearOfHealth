import { Component } from '@angular/core';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [DescriptionViewComponent],
  templateUrl: './description.component.html'
})
export class DescriptionComponent {
  constructor(private router: Router) {}

  public createOwnPlan() {
    this.router.navigate(['/create-own-plan']);
  }
}
