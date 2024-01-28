import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  IBodyToCreateListGoals,
  ICustomGoal
} from '../../../share/interfaces/goals.interfaces';
import { textValidator } from '../../../share/validators/text.validator';

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
    CommonModule,
    MatIconModule
  ],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.scss'
})
export class CreatePlanFormComponent implements OnInit {
  @Input() listPersonalHabits: ICustomGoal[] | null;

  constructor(private fb: FormBuilder) {}

  public currentCustomSettingsControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(40),
    textValidator()
  ]);

  userPlanPoints: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const initialFormControls: Record<string, FormControl> = {};
    this.listPersonalHabits?.forEach((goal) => {
      initialFormControls[goal.id] = this.fb.control(true);
    });
    this.userPlanPoints = this.fb.group(initialFormControls);
  }

  public btnTitle = 'Set';

  @Output() submitUserPlan = new EventEmitter<any>();

  @Output() addUserCustomHabit = new EventEmitter<any>();

  public addUserPlan(): void {
    if (this.listPersonalHabits?.length) {
      this.submitUserPlan.emit(this.mutateUserDataToArrayBody());
    }
  }

  public addCheckbox() {
    if (this.currentCustomSettingsControl.value) {
      this.addUserCustomHabit.emit(
        this.currentCustomSettingsControl.value?.trim()
      );
      this.currentCustomSettingsControl.setValue('');
      this.initializeForm();
    }
  }

  private mutateUserDataToArrayBody(): IBodyToCreateListGoals[] {
    if (this.listPersonalHabits?.length) {
      const newArray = this.listPersonalHabits.map((item) => ({
        isActive: this.userPlanPoints.value[item.id],
        name: item.name,
        goalId: item.id
      }));
      return newArray;
    } else return [];
  }

  areAnyCheckboxesChecked(): boolean {
    return (
      this.userPlanPoints.value &&
      Object.values(this.userPlanPoints.value).some((value) => value)
    );
  }
}
