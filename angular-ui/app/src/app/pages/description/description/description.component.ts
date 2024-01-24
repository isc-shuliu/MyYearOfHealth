import { Component, OnInit } from '@angular/core';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../share/services/loading.service';
import { ICustomCarePlanItem } from '../../../share/interfaces/carePlan.interface';

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
    private carePlanService: CarePlanService,
    public loadingService: LoadingService
  ) {}

  public userId: string;

  public carePlanItems$: Observable<ICustomCarePlanItem[]>;

  ngOnInit(): void {
    this.getUserId();
    this.loadCarePlan();
  }

  public createOwnPlan() {
    this.router.navigate(['/create-own-plan']);
  }

  private loadCarePlan() {
    const customCarePlan$ = this.carePlanService.getDataAboutCustomCarePlanItem(
      this.userId
    );
    const loadData$ =
      this.loadingService.showSpinnerUntilCompleted(customCarePlan$);

    this.carePlanItems$ = loadData$.pipe(map((data) => data));
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }
}
