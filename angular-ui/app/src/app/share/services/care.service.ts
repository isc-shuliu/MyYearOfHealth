import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { environmentAPI, environmentFHIR } from '../../../environment/env';
import { ICarePlan, ICarePlanData } from '../interfaces/carePlan.interface';

@Injectable({ providedIn: 'root' })
export class CarePlanService {
  constructor(private httpClient: HttpClient) {}

  getUserObservationAndPlanCareInfo(userId: string) {
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'user/' + userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  getMainCarePlan(userId: string): Observable<ICarePlan[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      patient: userId,
      status: 'active'
    });
    return this.httpClient
      .get<ICarePlanData>(environmentFHIR.apiUrl + 'CarePlan', {
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

  /*---save user personal items---*/
  sendUserCarePlanData(body: {
    careplans: string[];
    userId: number;
  }): Observable<any> {
    return this.httpClient
      .post<any>(environmentAPI.apiUrl + 'care-plan', body)
      .pipe(
        map((data) => {
          return data;
        }),
        shareReplay()
      );
  }

  /***data for care plan description page****/
  getDataAboutCarePlanItem(userId: string) {
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'care-plan/' + userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  getFHIRDataAboutCarePlanItem(item: string, userId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      patient: userId,
      code: item
    });
    return this.httpClient
      .get<any>(environmentFHIR.apiUrl + 'CarePlan', {
        params: queryParams
      })
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }
}
