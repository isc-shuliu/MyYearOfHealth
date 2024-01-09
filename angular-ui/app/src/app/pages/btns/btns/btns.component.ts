import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btns',
  standalone: true,
  imports: [],
  templateUrl: './btns.component.html',
  styleUrl: './btns.component.scss'
})
export class BtnsComponent {
  constructor(private router: Router) {}
  public clickObservationData() {
    this.router.navigate(['/data-results']);
  }

  public clickPlanCare() {
    this.router.navigate(['/description-plan']);
  }
}
