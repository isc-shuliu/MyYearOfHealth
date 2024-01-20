import { HttpClient } from '@angular/common/http';
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
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'daily-goal/' + body.userId)
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
