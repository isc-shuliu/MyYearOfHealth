import { Component, OnInit } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';
import { ObservationService } from '../../../share/services/observation.service';
import {
  IPatientData,
  IUserCarePlan,
  IUserData,
  IUserObservationData
} from '../../../share/interfaces/carePlan.interface';
import { LoadingService } from '../../../share/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoViewComponent],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  constructor(
    public storage: LocalStorageService,
    public careService: CarePlanService,
    public observationService: ObservationService,
    public loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.loadUserObservationAndCarePlanData();
  }

  public user$: Observable<number>;
  public userId: number;
  public patientData$: Observable<IPatientData>;
  public userData$: Observable<IUserData>;
  public observationData$: Observable<IUserObservationData[]>;
  public planCareData$: Observable<IUserCarePlan[]>;

  private loadUserObservationAndCarePlanData() {
    const patientData$ =
      this.observationService.getUserObservationAndPlanCareInfo(this.userId);
    const loadData$ =
      this.loadingService.showSpinnerUntilCompleted(patientData$);

    this.userData$ = loadData$.pipe(map((data) => data.user));

    this.observationData$ = loadData$.pipe(map((data) => data.observations));
    this.planCareData$ = loadData$.pipe(map((data) => data.carePlans));
  }

  private getUserId() {
    this.userId = Number(this.storage.getUserID());
    this.user$ = of(this.userId);
  }

  public postUserSettingsAboutPlan(data: {
    carePlan: string[];
    observationData: string[];
  }) {
    if (data.carePlan) {
      const carePlanBody = {
        userId: this.userId,
        careplans: [...data.carePlan.map((el) => Number(el))]
      };
      this.careService.sendUserCarePlanData(carePlanBody).subscribe();
    }
    if (data.observationData) {
      const oservationBody = {
        userId: this.userId,
        observations: data.observationData
      };

      this.observationService
        .postObservationUserSetting(oservationBody)
        .subscribe();
    }

    this.router.navigate(['/menu']);
  }
}
