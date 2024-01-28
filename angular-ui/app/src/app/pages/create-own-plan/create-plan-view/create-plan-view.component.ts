import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreatePlanFormComponent } from '../create-plan-form/create-plan-form.component';
import { CommonModule } from '@angular/common';
import { ICustomGoal } from '../../../share/interfaces/goals.interfaces';

@Component({
  selector: 'app-create-plan-view',
  standalone: true,
  imports: [CreatePlanFormComponent, CommonModule],
  templateUrl: './create-plan-view.component.html',
  styleUrl: './create-plan-view.component.scss'
})
export class CreatePlanViewComponent {
  @Input() listPersonalHabits: ICustomGoal[] | null;

  @Output() submitUserPlan = new EventEmitter<any>();

  @Output() addUserCustomHabit = new EventEmitter<any>();
}
