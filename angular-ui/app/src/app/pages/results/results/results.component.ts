import { Component, OnInit } from '@angular/core';
import { ResultsViewComponent } from '../results-view/results-view.component';
import { Router } from '@angular/router';
import { CarePlanService } from '../../../share/services/care.service';
import { LoadingService } from '../../../share/services/loading.service';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { ObservationService } from '../../../share/services/observation.service';
import { Observable, map, of } from 'rxjs';
import { ICustomObservationResult } from '../../../share/interfaces/onservation.interface.';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ResultsViewComponent],
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  constructor(
    public storage: LocalStorageService,
    public careService: CarePlanService,
    public observationService: ObservationService,
    public loadingService: LoadingService,
    private router: Router
  ) {}

  public user$: Observable<string>;
  public userId: string;

  public userCustomObservationData$: Observable<ICustomObservationResult[]>;

  ngOnInit(): void {
    this.getUserId();
    this.loadUserObservationData();
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
    this.user$ = of(this.userId);
  }

  private loadUserObservationData() {
    const userObservationData$ =
      this.observationService.getUserCustomObservationData(this.userId);
    const loadData$ =
      this.loadingService.showSpinnerUntilCompleted(userObservationData$);

    this.userCustomObservationData$ = loadData$.pipe(map((data) => data));
  }

  public goToMenu() {
    this.router.navigate(['/menu']);
  }
}
