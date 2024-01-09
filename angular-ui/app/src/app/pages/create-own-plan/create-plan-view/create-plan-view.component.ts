import { Component } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';

@Component({
  selector: 'app-create-plan-view',
  standalone: true,
  imports: [SetBtnComponent],
  templateUrl: './create-plan-view.component.html',
  styleUrl: './create-plan-view.component.scss'
})
export class CreatePlanViewComponent {
  public btnTitle = 'Set';

  public setYourDetailsPlan() {}
}
