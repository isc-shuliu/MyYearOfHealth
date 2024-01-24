import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { environmentAPI } from '../../../environment/env';
import { IPatientData } from '../interfaces/carePlan.interface';
import { ICustomObservationResult } from '../interfaces/observation.interface.';

@Injectable({ providedIn: 'root' })
export class ObservationService {
  constructor(private httpClient: HttpClient) {}

  queryParams = new HttpParams();

  getUserObservationAndPlanCareInfo(userId: number): Observable<IPatientData> {
    return this.httpClient
      .get<IPatientData>(environmentAPI.apiUrl + 'user/' + userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  postObservationUserSetting(body: {
    observations: string[];
    userId: number;
  }): Observable<any> {
    return this.httpClient
      .post<any>(environmentAPI.apiUrl + 'observation', body)
      .pipe(
        map((data) => {
          return data;
        }),
        shareReplay()
      );
  }

  getUserCustomObservationData(
    userId: string
  ): Observable<ICustomObservationResult[]> {
    return this.httpClient
      .get<ICustomObservationResult[]>(
        environmentAPI.apiUrl + 'observation/' + userId
      )
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
