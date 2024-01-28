import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { GoalsService } from '../../../share/services/goal.service';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  ICustomGoal,
  IGoalsForPeriod,
  IGoalsPeriod
} from '../../../share/interfaces/goals.interfaces';
import { LoadingService } from '../../../share/services/loading.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarViewComponent, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  constructor(
    private storage: LocalStorageService,
    private goalsService: GoalsService,
    public loadingService: LoadingService
  ) {}
  public userId: string;

  public selectedDay: Date;

  public firstDayOfMonth: string;
  public lastDayOfMonth: string;

  public periodTimeForTrackGoals: {
    dateFrom: string;
    dateTo: string;
  };

  public goalsListForPeriod$: Observable<IGoalsForPeriod[]>;

  public listPersonalHabits$: Observable<ICustomGoal[]>;

  public trackerGoals: IGoalsForPeriod[];

  ngOnInit(): void {
    this.getCurrentDate(new Date());
    this.periodTimeForTrackGoals = {
      dateFrom: this.firstDayOfMonth,
      dateTo: this.lastDayOfMonth
    };
    this.getUserId();

    this.getGoals();
    this.getHabitsForCurrentUser();
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }

  private getCurrentDate(date: any) {
    this.selectedDay = date;

    const firstDayOfMonth = new Date(
      this.selectedDay.getFullYear(),
      this.selectedDay.getMonth(),
      1
    );

    this.firstDayOfMonth = this.formatDate(firstDayOfMonth);
    const lastDayOfMonth = this.getLastDayOfMonth(
      this.selectedDay.getFullYear(),
      this.selectedDay.getMonth()
    );
    this.lastDayOfMonth = this.formatDate(lastDayOfMonth);
  }

  public checkDayActivities(data: { day: Date; arrayId: string[] }) {
    const body = {
      userId: this.userId,
      goals: [...data.arrayId],
      date: this.formatDate(data.day)
    };
    this.goalsService.fillDailyGoals(body).subscribe((data) => this.getGoals());
  }

  public changePeriodToObserve(period: any) {
    this.selectedDay = period;
    this.periodTimeForTrackGoals = {
      dateFrom: this.firstDayOfMonth,
      dateTo: this.lastDayOfMonth
    };
    this.getGoals();
  }

  public dayClick(e: any) {
    this.selectedDay = e.date;
  }

  private getGoals() {
    const goalsData$ = this.goalsService.trackYourHabitsForPeriod({
      userId: this.userId,
      dateFrom: this.firstDayOfMonth,
      dateTo: this.lastDayOfMonth
    });
    this.goalsListForPeriod$ =
      this.loadingService.showSpinnerUntilCompleted(goalsData$);
  }

  public getHabitsForCurrentUser() {
    this.listPersonalHabits$ = this.goalsService.getListGoals(this.userId);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getLastDayOfMonth(year: any, month: any) {
    let date = new Date(year, month + 1, 0);
    return date;
  }
}
