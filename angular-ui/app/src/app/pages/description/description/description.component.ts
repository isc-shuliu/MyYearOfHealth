import { Component, OnInit } from '@angular/core';
import { DescriptionViewComponent } from '../description-view/description-view.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [DescriptionViewComponent],
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private carePlanService: CarePlanService
  ) {}

  public userId: string;

  ngOnInit(): void {
    this.getUserId();
    this.loadCarePlan();
  }

  public createOwnPlan() {
    this.router.navigate(['/create-own-plan']);
  }

  private loadCarePlan() {
    const carePlanItems = this.storage.getUserCarePlans();
    this.carePlanService.getDataAboutCarePlanItem(this.userId).subscribe();
    carePlanItems.forEach((item) =>
      this.carePlanService
        .getFHIRDataAboutCarePlanItem(item, this.userId)
        .subscribe()
    );
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }
}
