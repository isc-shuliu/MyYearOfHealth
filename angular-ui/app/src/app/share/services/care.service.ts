import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { environmentAPI } from '../../../environment/env';
import { ICustomCarePlanItem } from '../interfaces/carePlan.interface';

@Injectable({ providedIn: 'root' })
export class CarePlanService {
  constructor(private httpClient: HttpClient) {}

  /*---save user personal items---*/
  sendUserCarePlanData(body: {
    careplans: number[];
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
  getDataAboutCustomCarePlanItem(
    userId: string
  ): Observable<ICustomCarePlanItem[]> {
    return this.httpClient
      .get<ICustomCarePlanItem[]>(
        environmentAPI.apiUrl + 'care-plan/' + userId + '/active'
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
