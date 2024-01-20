import { Component, OnInit } from '@angular/core';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { GoalsService } from '../../../share/services/goal.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  public goalsList$: Observable<any>;

  ngOnInit(): void {
    this.getUserId();
    this.getGoals();
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }

  private getGoals() {
    this.goalsList$ = this.goalsService.getListGoals(this.userId);
  }
}
