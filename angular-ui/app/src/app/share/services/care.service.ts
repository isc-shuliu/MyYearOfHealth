import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  map,
  of,
  shareReplay,
  tap,
  throwError
} from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { environment } from '../../../environment/env';
import { ICarePlan, ICarePlanData } from '../interfaces/carePlan.interface';

@Injectable({ providedIn: 'root' })
export class CarePlanService {
  constructor(
    private storage: LocalStorageService,
    private httpClient: HttpClient
  ) {}
  //http://localhost:32783/fhir/r4/CarePlan?patient=1384&status=active

  getCarePlan(): Observable<ICarePlan[]> {
    const userID = this.storage.getUserID();
    if (userID == '') {
      return of();
    } else {
      let queryParams = new HttpParams();
      queryParams = queryParams.appendAll({
        patient: userID,
        status: 'active'
      });
      return this.httpClient
        .get<ICarePlanData>(environment.apiUrl + 'CarePlan', {
          params: queryParams
        })
        .pipe(
          map((data) => data.entry),
          catchError((err) => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(() => err);
          }),
          shareReplay()
        );
    }
  }
}
