import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';
import {catchError, map, throwError} from 'rxjs';
import {CohortData} from '../models/cohort-data';

export interface SampleDTO {
  id: number;
  name: string;
  date: CohortData;
}

@Injectable({
  providedIn: 'root',
})
export class SamplesService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private cachedSamples = signal<SampleDTO[] | null>(null); // Cached as a signal, fetched only once

  getSamples(): Signal<SampleDTO[]> {
    if (!this.cachedSamples()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}samples`).pipe(
        map((response: any) =>
          response.map((el: any) => ({
            ...el,
            data: el.data as CohortData
          }))
        ),
        catchError(error => {
          this.sharedHttpErrorService.setErrorMessage("Error Receiving Data From Service.");
          return throwError(error);
        })
      ).subscribe((data: any[]) => this.cachedSamples.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedSamples.asReadonly() as Signal<any[]>;
  }
}
