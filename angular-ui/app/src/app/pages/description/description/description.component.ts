import { Component, OnInit } from '@angular/core';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, DescriptionViewComponent],
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private carePlanService: CarePlanService
  ) {}

  public userId: string;

  public carePlanItems$: Observable<{ userId: number; carePlan: string }[]>;

  ngOnInit(): void {
    this.getUserId();
    this.loadCarePlan();
  }

  public createOwnPlan() {
    this.router.navigate(['/create-own-plan']);
  }

  private loadCarePlan() {
    // this.carePlanItems$ = this.carePlanService.getDataAboutCarePlanItem(
    //   this.userId
    // );

    this.carePlanItems$ = of([
      {
        userId: Number(this.userId),
        carePlan: 'mock-item'
      },
      {
        userId: Number(this.userId),
        carePlan: 'mock-item'
      }
    ]);
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }
}
