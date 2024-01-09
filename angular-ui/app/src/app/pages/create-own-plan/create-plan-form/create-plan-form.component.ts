import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-plan-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.scss'
})
export class CreatePlanFormComponent {
  constructor(private fb: FormBuilder) {}

  public btnTitle = 'Set';

  @Output() setPersonalPlan = new EventEmitter<any>();

  userPlanPoints = this.fb.group({
    steps: false,
    meditation: false,
    workOut: false,
    customSettings: ''
  });

  public disabledCondition =
    this.userPlanPoints.value.steps == false &&
    this.userPlanPoints.value.meditation &&
    this.userPlanPoints.value.workOut &&
    !this.userPlanPoints.value.customSettings?.length;

  public submitUserPlan(): void {
    this.setPersonalPlan.emit(this.userPlanPoints.value);
  }
}
