import {inject, Injectable} from '@angular/core';
import {Observable, map, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';
import {catchError} from 'rxjs/operators';

export interface PresetValuesResponse {
  parameters: {
    code: string;
    system: string;
  };
  count: number;
  results: Array<{
    valueType: 'Quantity' | 'String';
    presetName: string;
    quantityMin?: number;
    quantityMax?: number;
    quantityUnit?: string;
  }>;
}

export interface PresetQueryParams {
  code: string;
  system: string;
}

export interface PresetLabObservationValue {
  code: string;
  system: string;
  presetName: string;
  valueType: 'Quantity' | 'String';
  quantityMin?: string;
  quantityMax?: string;
  quantityUnit?: string;
}

@Injectable({
  providedIn: 'root',
})

export class PresetLabObservationValuesService {

  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);

  getObservationValuePresets(params: PresetQueryParams): Observable<PresetLabObservationValue[]> {
    const queryParams = new HttpParams()
      .set('code', params.code)
      .set('system', params.system);

    return this.http.get<PresetValuesResponse>(
      `${this.environmentHandler.getBaseApiURL()}presets/observation/value`,
      { params: queryParams }
    ).pipe(
      map(response =>
        response.results.map(result => ({
          code: response.parameters.code,
          system: response.parameters.system,
          presetName: result.presetName,
          valueType: result.valueType,
          quantityMin: result.quantityMin?.toString(),
          quantityMax: result.quantityMax?.toString(),
          quantityUnit: result.quantityUnit
        }))
      ),
      catchError(error => {
        this.sharedHttpErrorService.setErrorMessage("Error loading observation value presets.");
        return throwError(() => error);
      })
    );
  }
}
