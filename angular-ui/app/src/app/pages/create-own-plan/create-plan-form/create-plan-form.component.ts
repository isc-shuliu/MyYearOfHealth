import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    CommonModule,
    MatIconModule
  ],
  templateUrl: './create-plan-form.component.html',
  styleUrl: './create-plan-form.component.scss'
})
export class CreatePlanFormComponent implements OnInit {
  @Input() listPersonalHabits: string[] | null;

  constructor(private fb: FormBuilder) {}

  public currentCustomSettings: string = '';
  public customListHabbits: string[] = [];

  userPlanPoints: FormGroup;

  ngOnInit(): void {
    const initialFormControls: Record<string, FormControl> = {};
    this.listPersonalHabits?.forEach((checkbox) => {
      initialFormControls[checkbox] = new FormControl(false);
    });

    this.userPlanPoints = this.fb.group(initialFormControls);
  }

  public btnTitle = 'Set';

  @Output() setPersonalPlan = new EventEmitter<any>();

  @Output() setCustomHabit = new EventEmitter<any>();

  public submitUserPlan(): void {
    this.setPersonalPlan.emit(this.userPlanPoints.value);
  }

  public addCheckbox() {
    if (this.customListHabbits && this.currentCustomSettings.length) {
      this.customListHabbits.push(this.currentCustomSettings);

      const newCheckboxControl = new FormControl(true);
      this.userPlanPoints.addControl(
        this.currentCustomSettings,
        newCheckboxControl
      );
      this.setCustomHabit.emit(this.currentCustomSettings);
      this.currentCustomSettings = '';
    }
  }

  public isCheckedFields(): boolean {
    return Object.values(this.userPlanPoints.value).some(
      (value: unknown) => value === true
    );
  }
}
