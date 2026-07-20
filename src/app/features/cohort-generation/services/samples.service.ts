import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {catchError, map} from 'rxjs';
import {CohortData} from '../models/cohort-data';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';

/** Sample cohort configuration with ID, name, and form data. */
export interface SampleDTO {
  id: number;
  name: string;
  date: CohortData;
}

/**
 * Service for fetching and caching sample cohort configurations from the API.
 * Samples are pre-configured cohorts that users can load as starting points.
 */
@Injectable({
  providedIn: 'root',
})
export class SamplesService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private cachedSamples = signal<SampleDTO[] | null>(null);

  /** Fetches and caches sample cohorts from the API (fetched only once). */
  getSamples(): Signal<SampleDTO[]> {
    if (!this.cachedSamples()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}samples`).pipe(
        map((response: any) =>
          response.map((el: any) => ({
            ...el,
            data: el.data as CohortData
          }))
        ),
        catchError(error => this.sharedHttpErrorService.handleError(error))
      ).subscribe((data: any[]) => this.cachedSamples.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedSamples.asReadonly() as Signal<any[]>;
  }
}
