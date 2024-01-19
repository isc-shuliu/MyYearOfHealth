import { Component, OnInit } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Router } from '@angular/router';
import { Observable, map, of, retry, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';
import {
  ICarePlan,
  ICustomItem
} from '../../../share/interfaces/carePlan.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoViewComponent],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  constructor(
    private router: Router,
    public storage: LocalStorageService,
    public careService: CarePlanService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.loadUserData();
    this.carePlan();
  }

  public carePlanData$: Observable<any>;

  public user$: Observable<any>;

  public userId: string;

  public setUserSettings(data: {
    carePlan: string[];
    observationData: string[];
  }) {
    const body = {
      userId: Number(this.storage.getUserID()),
      careplans: data.carePlan
    };
    this.careService.sendUserCarePlanData(body).subscribe();

    this.storage.saveUserCarePlanItems(data.carePlan);
    this.router.navigate(['/choice']);
  }

  private getUserId() {
    this.userId = this.storage.getUserID();
  }

  private loadUserData(): void {
    this.user$ = of(this.storage.getUserData());
  }

  private carePlan() {
    this.carePlanData$ = this.careService.getMainCarePlan(this.userId).pipe(
      map((data) => {
        return this.changeElementsPlan(data);
      })
    );
    this.carePlanData$.subscribe((data) => console.log(data));
  }

  private changeElementsPlan(data: ICarePlan[]) {
    const customItems: ICustomItem[] = data.map((carePlan) => {
      const customItem: ICustomItem = {
        id: +carePlan.resource.id,
        item: carePlan.resource.category[0].text
      };

      return customItem;
    });
    return customItems;
  }
}
