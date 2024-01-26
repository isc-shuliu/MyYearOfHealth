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
  uniqueNamesGoals: ICustomGoal[];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const initialFormControls: Record<string, FormControl> = {};
    const uniqueNames = this.getUniqueNames();
    this.uniqueNamesGoals = [...uniqueNames];
    this.uniqueNamesGoals.forEach((goal) => {
      initialFormControls[goal.id] = this.fb.control(false);
    });

    this.userPlanPoints = this.fb.group(initialFormControls);
    this.userPlanPoints = this.fb.group(initialFormControls);
  }

  private getUniqueNames(): any[] {
    const uniqueNamesMap = new Map<string, any>();

    this.listPersonalHabits?.forEach((item) => {
      const trimmedName = item.name.trim();

      if (trimmedName !== '') {
        uniqueNamesMap.set(trimmedName, {
          name: trimmedName,
          id: item.id
        });
      }
    });

    const uniqueNames: any[] = Array.from(uniqueNamesMap.values());
    return uniqueNames;
  }

  public btnTitle = 'Set';

  @Output() submitUserPlan = new EventEmitter<any>();

  @Output() addUserCustomHabit = new EventEmitter<any>();

  public addUserPlan(): void {
    this.submitUserPlan.emit(this.mutateUserDataToArrayBody());
  }

  public addCheckbox() {
    if (this.currentCustomSettingsControl.value) {
      const newCheckboxControl = new FormControl(true);
      this.userPlanPoints.addControl(
        this.currentCustomSettingsControl.value.trim(),
        newCheckboxControl
      );
      this.addUserCustomHabit.emit(
        this.currentCustomSettingsControl.value?.trim()
      );
      this.currentCustomSettingsControl.setValue('');
      this.initializeForm();
    }
  }

  public isCheckedFields(): boolean {
    return Object.values(this.userPlanPoints.value).some(
      (value: unknown) => value === true
    );
  }

  private mutateUserDataToArrayBody(): IBodyToCreateListGoals[] {
    const newArray = this.uniqueNamesGoals
      .filter((item) => this.userPlanPoints.value[item.id])
      .map((item) => ({
        isActive: true,
        name: item.name,
        goalId: item.id
      }));
    return newArray;
  }
}
