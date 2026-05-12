import {inject, Injectable, signal, Signal} from '@angular/core';
import {catchError, map, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {UseCase} from '../models/use-case';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class UseCasesService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private cachedUseCases = signal<UseCase[] | null>(null); // Cached as a signal, fetched only once

  getUseCases(): Signal<UseCase[]> {
    if (!this.cachedUseCases()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}usecaseguidance`).pipe(
        map((response: any) => response.useCases),
        catchError(error => {
          console.error(error);
          this.sharedHttpErrorService.setErrorMessage("Error Receiving Data From Service.");
          return throwError(error);
        })
      ).subscribe((data: UseCase[]) => this.cachedUseCases.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedUseCases.asReadonly() as Signal<UseCase[]>;
  }
}
