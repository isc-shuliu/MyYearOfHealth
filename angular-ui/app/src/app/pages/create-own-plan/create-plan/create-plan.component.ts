import { Component, OnInit } from '@angular/core';
import { CreatePlanViewComponent } from '../create-plan-view/create-plan-view.component';
import { Router } from '@angular/router';
import { GoalsService } from '../../../share/services/goal.service';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { Observable, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../share/services/loading.service';
import { ICustomGoal } from '../../../share/interfaces/goals.interfaces';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [CreatePlanViewComponent, CommonModule],
  templateUrl: './create-plan.component.html'
})
export class CreatePlanComponent implements OnInit {
  constructor(
    private router: Router,
    private goalService: GoalsService,
    public storage: LocalStorageService,
    public loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.getUserId();
    this.getHabitsForCurrentUser();
  }

  public userId: string;
  public listPersonalHabits$: Observable<ICustomGoal[]>;

  private getUserId() {
    this.userId = this.storage.getUserID();
  }

  public getHabitsForCurrentUser() {
    const listPersonalHabits$ = this.goalService.getListGoals(this.userId);
    const loadData$ =
      this.loadingService.showSpinnerUntilCompleted(listPersonalHabits$);

    this.listPersonalHabits$ = loadData$.pipe(map((data) => data));
  }

  public addUserCustomHabit(newUserCustomHabit: string) {
    if (newUserCustomHabit.length > 3) {
      const body = {
        userId: Number(this.userId),
        name: newUserCustomHabit,
        isActive: true
      };
      this.goalService
        .addCustomGoal(body)
        .pipe(tap(() => this.getHabitsForCurrentUser()))
        .subscribe();
    }
  }

  public submitUserPlan(body: any) {
    this.goalService.submitListDailyGoalsForUser(body).subscribe();
    this.router.navigate(['/tracker-calendar']);
  }
}
