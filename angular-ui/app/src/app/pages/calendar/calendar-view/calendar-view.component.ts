import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule
} from '@angular/material/datepicker';
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
import { IGoalsForPeriod } from '../../../share/interfaces/goals.interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDatepickerModule,
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      console.log(changes);
      this.goalsListForPeriod = changes['goalsListForPeriod'].currentValue;
      console.log(this.goalsListForPeriod);
    }
  }

  @Input() goalsListForPeriod: IGoalsForPeriod[] | null;

  @Input() listPersonalHabits: string[] | null;

  @Input() today: Date;

  @Output() checkDayActivities = new EventEmitter<any>();

  @Output() changePeriodToObserve = new EventEmitter<any>();

  selectedDay: Date | null;
  selectedMonth: number;

  firstDayOfMonth: Date | null;
  lastDayOfMonth: Date | null;

  userPlanPoints: FormGroup;

  isFormFilledForThisDay: boolean = false;

  ngOnInit(): void {
    this.selectedDay = this.today;
    this.selectedMonth = this.selectedDay.getMonth();
    this.onDateSelected(this.today);
    this.checkCurrentDayForForm();

    const initialFormControls: Record<string, FormControl> = {};
    this.listPersonalHabits?.forEach((checkbox) => {
      initialFormControls[checkbox] = new FormControl(false);
    });

    this.userPlanPoints = this.fb.group(initialFormControls);
  }

  public submitDailyActivities() {}

  checkCurrentDayForForm() {}

  onDateSelected(date: any): void {
    this.today = new Date();
    this.selectedDay = date;
    const dayOfMonth = this.getDayOfMonth(date);
    this.firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (
      this.goalsListForPeriod?.find(
        (el) => el.dayOfMonth == dayOfMonth && el.completedGoals != 0
      )
    ) {
      this.isFormFilledForThisDay = true;
    } else this.isFormFilledForThisDay = false;
    console.log(this.selectedDay);
    this.changePeriodToObserve.emit(this.selectedDay);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const cellMonth = cellDate.getMonth();
    const currentMonth = this.today.getMonth();
    const dayOfMonth = this.getDayOfMonth(cellDate);

    if (this.selectedMonth === currentMonth) {
      const dayData = this.goalsListForPeriod?.find(
        (item) => item.dayOfMonth === dayOfMonth
      );

      if (dayData) {
        if (dayData.completedGoals === dayData.totalActiveGoals) {
          return 'active-day';
        }
        if (
          dayData.completedGoals !== 0 &&
          dayData.completedGoals < dayData.totalActiveGoals
        ) {
          return 'half-active-day';
        }
      }
    }

    return '';
  };

  getDayOfMonth(date: any): number {
    const dateObject = new Date(date);
    const dayOfMonth = dateObject.getDate();
    return dayOfMonth;
  }
}
