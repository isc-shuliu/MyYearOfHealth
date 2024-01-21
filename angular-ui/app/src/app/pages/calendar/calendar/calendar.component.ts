import { Component, OnInit } from '@angular/core';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { GoalsService } from '../../../share/services/goal.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IGoalsForPeriod } from '../../../share/interfaces/goals.interfaces';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarViewComponent, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private goalsService: GoalsService
  ) {}
  public userId: string;

  public today: Date;

  currentDate: string;

  firstDayOfMonth: string;

  public goalsListForPeriod$: Observable<IGoalsForPeriod[]>;

  public listPersonalHabits$: Observable<any[]>;

  ngOnInit(): void {
    this.getUserId();
    this.getCurrentDate();
    this.getGoals();
    this.getHabbutsForCurrentUser();
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }

  private getCurrentDate() {
    this.today = new Date();
    this.currentDate = this.formatDate(this.today);
    const firstDayOfMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    );
    this.firstDayOfMonth = this.formatDate(firstDayOfMonth);
  }

  public checkDayActivities(goals: string) {
    console.log(goals);
  }

  public changePeriodToObserve(period: string) {
    console.log(period);
    this.goalsListForPeriod$ = of([
      {
        dayOfMonth: 1,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 2,
        completedGoals: 3,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 3,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 4,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 5,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 6,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 7,
        completedGoals: 0,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 8,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: Number(this.currentDate.slice(-2)),
        completedGoals: 2,
        totalActiveGoals: 3
      }
    ]);
  }

  private getGoals() {
    // this.goalsListForPeriod$ = this.goalsService.getDailyGoalForPeriod({
    //   userId: this.userId,
    //   dateFrom: this.firstDayOfMonth,
    //   dateTo: this.currentDate
    // });
    this.goalsListForPeriod$ = of([
      {
        dayOfMonth: 1,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 2,
        completedGoals: 3,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 3,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 4,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 5,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 6,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 7,
        completedGoals: 0,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: 8,
        completedGoals: 2,
        totalActiveGoals: 3
      },
      {
        dayOfMonth: Number(this.currentDate.slice(-2)),
        completedGoals: 2,
        totalActiveGoals: 3
      }
    ]);
  }

  public getHabbutsForCurrentUser() {
    // this.listPersonalHabits$ = this.goalsService.getListGoals(this.userId);
    this.listPersonalHabits$ = of([
      'mediation',
      '5000 steps',
      '10 minut work-out'
    ]);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
