import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  ICustomGoal,
  IGoalsForPeriod
} from '../../../share/interfaces/goals.interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { CustomCalendarComponent } from '../../../components/custom-calendar/custom-calendar.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatFormFieldModule,
    CustomCalendarComponent
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listPersonalHabits']) {
      this.listPersonalHabits = changes['listPersonalHabits'].currentValue;
      const initialFormControls: Record<string, FormControl> = {};
      this.listPersonalHabits?.forEach((item) => {
        initialFormControls[item.id] = new FormControl(false);
      });

      this.userPlanPoints = this.fb.group(initialFormControls);
    }
    if (changes['goalsListForPeriod']) {
      this.goalsListForPeriod = changes['goalsListForPeriod'].currentValue;
      console.log(this.goalsListForPeriod);
    }
    this.trackSelectedDay();
  }

  @Input() goalsListForPeriod: IGoalsForPeriod[] | null;

  @Input() listPersonalHabits: ICustomGoal[] | null;

  @Input() selectedDay: Date | null;
  @Input() firstDayOfMonth: string;
  @Input() lastDayOfMonth: string;
  @Output() checkDayActivities = new EventEmitter<any>();
  @Output() dayClick = new EventEmitter<any>();

  selectedMonth: number | undefined;

  isDisabledBtnSubmit = true;

  userPlanPoints: FormGroup;

  isShowGoalsForThisDay: boolean = true;

  dataHalfactiveDays: number[] = [];
  dataActiveDays: number[] = [];

  ngOnInit(): void {
    this.selectedMonth = this.selectedDay?.getMonth();
    this.trackSelectedDay();
  }

  public submitDailyActivities() {
    const trueIds = Object.entries(this.userPlanPoints.value)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => Number(key));
    this.checkDayActivities.emit({ day: this.selectedDay, arrayId: trueIds });
    this.trackSelectedDay();
  }

  startDate: Date = new Date(new Date().getFullYear(), 0, 1);
  maxDate: Date = new Date();

  getDayOfMonth(date: any): number {
    const dateObject = new Date(date);
    const dayOfMonth = dateObject.getDate();
    return dayOfMonth;
  }

  private trackSelectedDay() {
    const index = this.goalsListForPeriod?.findIndex(
      (item) => item.dayOfMonth === this.selectedDay?.getDate()
    );

    if (
      index &&
      index != -1 &&
      this.goalsListForPeriod &&
      this.goalsListForPeriod[`${index}`].completedGoals !== 0
    ) {
      this.isShowGoalsForThisDay = false;
    } else if (
      index == 0 &&
      this.goalsListForPeriod &&
      this.goalsListForPeriod[`${index}`].completedGoals !== 0
    ) {
      this.isShowGoalsForThisDay = false;
    } else {
      this.isShowGoalsForThisDay = true;
    }
  }

  anyCheckboxChecked(): boolean {
    for (const controlName in this.userPlanPoints?.controls) {
      if (this.userPlanPoints?.get(controlName)?.value) {
        return true;
      }
    }
    return false;
  }
}
