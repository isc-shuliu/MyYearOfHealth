import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { environmentAPI, environmentFHIR } from '../../../environment/env';

@Injectable({ providedIn: 'root' })
export class ObservationService {
  constructor(private httpClient: HttpClient) {}

  queryParams = new HttpParams();

  getUserObservationInfo(userId: string) {
    this.queryParams = this.queryParams.appendAll({
      patient: userId
    });
    return this.httpClient
      .get<any>(environmentFHIR.apiUrl + 'Observation', {
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
