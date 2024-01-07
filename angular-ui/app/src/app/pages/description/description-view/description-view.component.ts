import { Component, EventEmitter, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';

@Component({
  selector: 'app-description-view',
  standalone: true,
  imports: [SetBtnComponent],
  templateUrl: './description-view.component.html',
  styleUrl: './description-view.component.scss'
})
export class DescriptionViewComponent {
  public btnTitle = 'Make it real';

  @Output() createPlan = new EventEmitter<any>();
}
