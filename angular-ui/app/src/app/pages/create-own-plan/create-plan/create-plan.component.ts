import { Component, OnInit } from '@angular/core';
import { CreatePlanViewComponent } from '../create-plan-view/create-plan-view.component';
import { Router } from '@angular/router';
import { GoalsService } from '../../../share/services/goal.service';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    public storage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.getUserId();
    this.getHabbutsForCurrentUser();
  }

  public userId: number;
  public listPersonalHabits$: Observable<any[]>;

  public setPersonalPlan(userPlanPoints: any) {
    //!!! body???Maria fix
    console.log(userPlanPoints);
    const body = {
      userId: this.userId,
      name: 'meditation',
      isActive: true
    };

    this.router.navigate(['/tracker-calendar']);
  }

  private getUserId() {
    this.userId = Number(this.storage.getUserID());
  }

  public getHabbutsForCurrentUser() {
    // this.listPersonalHabbits$ = this.goalService.getListGoals(this.userId);
    this.listPersonalHabits$ = of([
      'mediation',
      '5000 steps',
      '10 minut work-out'
    ]);
  }

  public setCustomHabit(newUserCustomHabit: string) {
    const body = {
      userId: this.userId,
      name: newUserCustomHabit,
      isActive: true
    };
    this.goalService.addCustomGoal(body).subscribe();
  }
}
