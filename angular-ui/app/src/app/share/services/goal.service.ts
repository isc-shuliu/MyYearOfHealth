import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import {
  IBodyToCreateCustomGoal,
  ICustomGoal,
  IDailyGoal,
  IGoalsPeriod
} from '../interfaces/goals.interfaces';
import { environmentAPI } from '../../../environment/env';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  constructor(
    private storage: LocalStorageService,
    private httpClient: HttpClient
  ) {}

  queryParams = new HttpParams();

  getListGoals(userId: string): Observable<ICustomGoal[]> {
    return this.httpClient
      .get<any[]>(environmentAPI.apiUrl + 'goal/' + userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  addCustomGoal(body: IBodyToCreateCustomGoal) {
    return this.httpClient.post<any>(environmentAPI.apiUrl + 'goal', body).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      shareReplay()
    );
  }

  submitListDailyGoalsForUser(body: ICustomGoal[]) {
    return this.httpClient
      .patch<any>(environmentAPI.apiUrl + 'goal', body)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }
  fillDailyGoals(body: IDailyGoal) {
    return this.httpClient
      .post<any>(environmentAPI.apiUrl + 'daily-goal', body)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  trackYourHabitsForPeriod(body: IGoalsPeriod) {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      dateFrom: body.dateFrom,
      dateTo: body.dateTo
    });
    console.log('123');
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'daily-goal/' + body.userId, {
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
