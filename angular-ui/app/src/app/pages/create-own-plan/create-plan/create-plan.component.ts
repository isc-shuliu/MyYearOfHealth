import { Component } from '@angular/core';
import { CreatePlanViewComponent } from '../create-plan-view/create-plan-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [CreatePlanViewComponent],
  templateUrl: './create-plan.component.html'
})
export class CreatePlanComponent {
  constructor(private router: Router) {}
}
