import {inject, Injectable, Signal, signal} from '@angular/core';
import {OccupationOption} from '../../models/use-case';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../../config/environment-handler.service';
import {SharedHttpErrorService} from '../../../../shared/services/shared-http-error.service';
import {catchError, map, throwError} from 'rxjs';
import {Concept} from '../../models/cohort-generation-request-body';
import {UI_CONSTANTS} from '../../../../constants/ui-constants';

export type PatientOccupationForm = {
  isRandomlyAssigned: FormControl<boolean>;
  occupationConcept: FormControl<Concept | null>;
};

@Injectable({
  providedIn: 'root',
})
export class OccupationHelperService {

  private fb = inject(FormBuilder).nonNullable as NonNullableFormBuilder;

  readonly DEFAULT_SERVER_ERROR_MSG = UI_CONSTANTS.ERROR_MSG.DEFAULT_SERVER_ERROR_MSG;
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private cachedPatientOccupations = signal<Concept[] | null>(null); // Cached as a signal, fetched only once

  getPatientOccupationFg (option: OccupationOption): FormGroup<PatientOccupationForm> {
    const fg = this.fb.group<PatientOccupationForm>({
      isRandomlyAssigned: this.fb.control(true),
      occupationConcept: this.fb.control< Concept | null>(null),
    });
    if (fg.controls.isRandomlyAssigned.value) {
      fg.controls.occupationConcept.disable();
    }
    this.setValueChangeSubscriptions(fg);
    return fg;
  }

  setValueChangeSubscriptions(fg: FormGroup<PatientOccupationForm>) {
    const isRandomlyAssignedCtrl = fg.controls.isRandomlyAssigned;
    const occupationCtrl = fg.controls.occupationConcept;

    isRandomlyAssignedCtrl.valueChanges.subscribe(
      value => {
        if (value) {
          occupationCtrl.disable();
          occupationCtrl.setValue(null, ({ emitEvent: false }));
        }
        else {
          occupationCtrl.enable();
        }
      }
    );
  }

  getPatientOccupations(): Signal<Concept[]> {
    if (!this.cachedPatientOccupations()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}valuesets/occupation`).pipe(
        map((response: any) => response.results),
        catchError(error => {
          console.error(error);
          this.sharedHttpErrorService.setErrorMessage(this.DEFAULT_SERVER_ERROR_MSG);
          return throwError(() => error);
        })
      ).subscribe((data: Concept[]) => this.cachedPatientOccupations.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedPatientOccupations.asReadonly() as Signal<Concept[]>;
  }
}
