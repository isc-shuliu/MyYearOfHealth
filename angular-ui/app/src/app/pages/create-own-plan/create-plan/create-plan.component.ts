import { Component, OnInit } from '@angular/core';
import { CreatePlanViewComponent } from '../create-plan-view/create-plan-view.component';
import { Router } from '@angular/router';
import { GoalsService } from '../../../share/services/goal.service';
import { LocalStorageService } from '../../../share/services/localStorage.service';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [CreatePlanViewComponent],
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
  }

  public userId: string;

  public setPersonalPlan(userPlanPoints: any) {
    //!!! body???
    console.log(userPlanPoints);
    const body = {
      userId: this.userId,
      name: 'meditation',
      isActive: true
    };
    this.goalService.createPlanGoals(body).subscribe();
    this.router.navigate(['/tracker-calendar']);
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }
}
