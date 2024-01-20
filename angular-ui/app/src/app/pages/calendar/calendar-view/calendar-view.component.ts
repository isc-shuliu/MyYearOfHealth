import { Component, Input, OnInit } from '@angular/core';
import {
  MatCalendarCellCssClasses,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
// import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatCardModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  // providers: [provideMomentDateAdapter()],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent implements OnInit {
  @Input() goalsList: any | null;

  selected: Date | null;

  ngOnInit(): void {
    // Инициализация данных календаря, например, для текущего месяца
    const currentDate = new Date();
    this.loadCalendarData(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
  }

  loadCalendarData(year: number, month: number): void {
    // this.calendarService.getCalendarData(year, month).subscribe((data) => {
    //   this.calendarData = data;
    // });
  }

  getCellCssClasses(date: Date): MatCalendarCellCssClasses {
    // Функция для определения классов стилей для ячеек календаря
    // Вам нужно адаптировать ее в соответствии с вашими данными с бэкенда
    if (date) {
      const day = date.getDate();
      // const isWorkingDay = this.calendarData.workingDays.includes(day);
      // const isHoliday = this.calendarData.holidays.includes(day);
      return {
        // 'working-day': isWorkingDay,
        // holiday: isHoliday
      };
    }
    return {};
  }
}
