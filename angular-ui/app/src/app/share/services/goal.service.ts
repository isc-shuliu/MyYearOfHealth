import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, throwError } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import {
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

  addCustomGoal(body: ICustomGoal) {
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

  getListGoals(userId: string) {
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'goal/' + userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  createDailyGoals(body: IDailyGoal) {
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

  getDailyGoalForPeriod(body: IGoalsPeriod) {
    this.queryParams = this.queryParams.appendAll({
      dateFrom: body.dateFrom,
      dateTo: body.dateTo
    });
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'daily-goal/' + body.userId, {
        params: this.queryParams
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
