import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, throwError } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { environmentAPI, environmentFHIR } from '../../../environment/env';
import { ICarePlan, ICarePlanData } from '../interfaces/carePlan.interface';
import { IGoal } from '../interfaces/goals.interfaces';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(
    private storage: LocalStorageService,
    private httpClient: HttpClient
  ) {}
  //http://localhost:32783/fhir/r4/CarePlan?patient=1384&status=active

  private userId = this.storage.getUserID();

  createPlanGoals(body: IGoal) {
    return this.httpClient.post<any>(environmentAPI.apiUrl + 'goal', body).pipe(
      map((data) => {
        return data;
      }),
      shareReplay()
    );
  }
}
