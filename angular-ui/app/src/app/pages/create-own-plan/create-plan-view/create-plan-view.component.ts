import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { CreatePlanFormComponent } from '../create-plan-form/create-plan-form.component';

@Component({
  selector: 'app-create-plan-view',
  standalone: true,
  imports: [SetBtnComponent, CreatePlanFormComponent],
  templateUrl: './create-plan-view.component.html',
  styleUrl: './create-plan-view.component.scss'
})
export class CreatePlanViewComponent {
  @Input() listPersonalHabits: any[] | null;

  @Output() setOwnPlanPoints = new EventEmitter<any>();

  @Output() addUserCustomHabit = new EventEmitter<any>();
}
