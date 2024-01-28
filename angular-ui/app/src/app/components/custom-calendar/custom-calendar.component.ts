import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  IGoalsForPeriod,
  ICustomGoal
} from '../../share/interfaces/goals.interfaces';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss'
})
export class CustomCalendarComponent {
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  @Output() dayClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() goalsListForPeriod: IGoalsForPeriod[] | null;
  firstDayOfMonth: any;
  calendarDays: any[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  selected: any;
  isSelected: boolean = false;
  ngOnInit(): void {
    this.generateCalendarDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['goalsListForPeriod']) {
      this.goalsListForPeriod = changes['goalsListForPeriod'].currentValue;
      this.generateCalendarDays();
    }
  }

  generateCalendarDays(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const isCurrentMonthYear =
      this.year === currentYear && this.month === currentMonth;
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
    this.calendarDays = [];

    for (let i = 0; i < this.firstDayOfMonth; i++) {
      this.calendarDays.push({
        date: null,
        dayOfMonth: null,
        dayOfWeek: '',
        isActive: false,
        isHalfActive: false,
        isCurrent: false,
        isSelected: false // Добавляем новое свойство для выбранной даты
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.year, this.month, i);
      const dayOfWeek = this.weekdays[date.getDay()];
      const days: any = {
        date: date,
        dayOfMonth: i,
        dayOfWeek: dayOfWeek,
        isActive: false,
        isHalfActive: false,
        isCurrent: false,
        isSelected: this.selected
          ? date.getTime() === this.selected.getTime()
          : false
      };

      if (isCurrentMonthYear && i === currentDay) {
        days.isCurrent = true;
      }

      const goalData = this.goalsListForPeriod?.find(
        (goal) => goal.dayOfMonth === i
      );
      if (goalData) {
        if (goalData.completedGoals === goalData.totalActiveGoals) {
          days.isActive = true;
        } else if (
          goalData.completedGoals > 0 &&
          goalData.completedGoals < goalData.totalActiveGoals
        ) {
          days.isHalfActive = true;
        }
      }

      this.calendarDays.push(days);
    }
  }

  onDayClick(day: any): void {
    if (day.date) {
      this.selected = day.date;
      this.dayClick.emit(day);
    }
    this.generateCalendarDays();
  }

  isFutureDate(day: any): boolean {
    return new Date(day.date) > new Date();
  }
}
