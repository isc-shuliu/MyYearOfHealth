import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, throwError } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { environmentAPI, environmentFHIR } from '../../../environment/env';
import { ICarePlan, ICarePlanData } from '../interfaces/carePlan.interface';

@Injectable({ providedIn: 'root' })
export class CarePlanService {
  constructor(
    private storage: LocalStorageService,
    private httpClient: HttpClient
  ) {}
  //http://localhost:32783/fhir/r4/CarePlan?patient=1384&status=active

  private userId = this.storage.getUserID();

  getMainCarePlan(): Observable<ICarePlan[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      patient: this.userId,
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

  getDataAboutCarePlanItem() {
    return this.httpClient
      .get<any>(environmentAPI.apiUrl + 'care-plan/' + this.userId)
      .pipe(
        map((data) => data),
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        shareReplay()
      );
  }

  getFHIRDataAboutCarePlanItem(item: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.appendAll({
      patient: this.userId,
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
