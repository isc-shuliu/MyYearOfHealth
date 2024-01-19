import { Component, OnInit } from '@angular/core';
import { UserInfoViewComponent } from '../user-info-view/user-info-view.component';
import { Router } from '@angular/router';
import { Observable, map, of, retry, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../share/services/localStorage.service';
import { CarePlanService } from '../../../share/services/care.service';
import {
  ICarePlan,
  ICarePlanData
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
    this.loadUserData();
    this.carePlan();
  }

  public carePlanData$: Observable<any>;

  public user$: Observable<any>;

  public setUserSettings(data: any) {
    console.log(data);
    this.router.navigate(['/choice']);
  }

  private loadUserData(): void {
    this.user$ = of(this.storage.getUserData());
  }

  private carePlan() {
    this.carePlanData$ = this.careService.getCarePlan().pipe(
      map((data) => {
        return this.changeElementsPlan(data);
      })
    );
    this.carePlanData$.subscribe((data) => console.log(data));
  }

  private changeElementsPlan(data: ICarePlan[]) {
    const arr = data.flatMap((el) => el.resource.activity);
    return arr;
  }
}
