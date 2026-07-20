import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {UseCase} from '../models/use-case';
import {UI_CONSTANTS} from '../../../constants/ui-constants';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';

/**
 * Service for fetching and caching use case configurations from the API.
 * Use cases define the form structure and rules for different cohort generation scenarios.
 */
@Injectable({
  providedIn: 'root'
})
export class UseCasesService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private cachedUseCases = signal<UseCase[] | null>(null);
  readonly DEFAULT_SERVER_ERROR_MSG = UI_CONSTANTS.ERROR_MSG.DEFAULT_SERVER_ERROR_MSG;

  /** Fetches and caches use cases from the API (fetched only once). */
  getUseCases(): Signal<UseCase[]> {
    if (!this.cachedUseCases()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}usecaseguidance`).pipe(
        map((response: any) => response.useCases),
        catchError(error => this.sharedHttpErrorService.handleError(error))
      ).subscribe((data: UseCase[]) => this.cachedUseCases.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedUseCases.asReadonly() as Signal<UseCase[]>;
  }

}
