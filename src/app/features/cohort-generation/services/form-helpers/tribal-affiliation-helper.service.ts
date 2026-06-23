import {inject, Injectable, Signal, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {PrevalenceForm, PrevalenceHelperService} from './prevalence-helper.service';
import {TribalAffiliationOption} from '../../models/use-case';
import {catchError, map, throwError} from 'rxjs';
import {Concept} from '../../models/cohort-generation-request-body';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../../config/environment-handler.service';
import {SharedHttpErrorService} from '../../../../shared/services/shared-http-error.service';

export type PatientTribalAffiliationForm = {
  isRandomlyAssigned: FormControl<boolean>;
  affiliation: FormControl<Concept | null>;
  prevalence: FormGroup<PrevalenceForm>;
};

@Injectable({
  providedIn: 'root',
})
export class TribalAffiliationHelperService {
  private fb = inject(FormBuilder).nonNullable as NonNullableFormBuilder;
  private prevalenceHelperService = inject(PrevalenceHelperService);

  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);

  getPatientTribalAffiliationFg(option: TribalAffiliationOption): FormGroup<PatientTribalAffiliationForm> {
    const fg = this.fb.group<PatientTribalAffiliationForm>({
      isRandomlyAssigned: this.fb.control(true),
      affiliation: this.fb.control<Concept | null>(null),
      prevalence: this.prevalenceHelperService.getPrevalenceFg({
        defaultValues: option.defaultValues.prevalence, control: "prevalence", ruleId: "prevalence", label: ''
      })
    });
    this.setValueChangeSubscriptions(fg);
    return fg;
  }

  private setValueChangeSubscriptions(fg: FormGroup<PatientTribalAffiliationForm>): void {
    const isRandomlyAssignedCtrl = fg.controls.isRandomlyAssigned;
    const affiliationCtrl = fg.controls.affiliation;
    const prevalenceValueCtrl = fg.controls.prevalence.controls.value;

    // Set initial state
    this.updateAffiliationControl(isRandomlyAssignedCtrl, affiliationCtrl, prevalenceValueCtrl, false);

    // React to prevalence changes
    prevalenceValueCtrl.valueChanges.subscribe(() =>
      this.updateAffiliationControl(isRandomlyAssignedCtrl, affiliationCtrl, prevalenceValueCtrl, false)
    );

    // React to isRandomlyAssigned changes
    isRandomlyAssignedCtrl.valueChanges.subscribe(() =>
      this.updateAffiliationControl(isRandomlyAssignedCtrl, affiliationCtrl, prevalenceValueCtrl, true)
    );
  }

  private updateAffiliationControl(
    isRandomlyAssignedCtrl: FormControl<boolean>,
    affiliationCtrl: FormControl<Concept | null>,
    prevalenceValueCtrl: FormControl<number>,
    clearValue: boolean
  ) {
    const prevalenceValue = prevalenceValueCtrl.value;
    // Use == instead of === to handle both number 0 and string "0"
    const shouldDisableBothControls = prevalenceValue == 0 || prevalenceValue === null;

    // When prevalence is 0 or null, disable both controls
    if (shouldDisableBothControls) {
      isRandomlyAssignedCtrl.disable({ emitEvent: false });
      affiliationCtrl.disable({ emitEvent: false });
      affiliationCtrl.clearValidators();
      affiliationCtrl.updateValueAndValidity({ emitEvent: false });
      return;
    }

    // Enable isRandomlyAssigned when prevalence is valid
    isRandomlyAssignedCtrl.enable({ emitEvent: false });

    // Handle affiliation based on isRandomlyAssigned value
    if (isRandomlyAssignedCtrl.value) {
      affiliationCtrl.disable({ emitEvent: false });
      affiliationCtrl.clearValidators();
      if (clearValue) {
        affiliationCtrl.setValue(null, { emitEvent: false });
      }
    } else {
      affiliationCtrl.enable({ emitEvent: false });
      affiliationCtrl.setValidators([Validators.required]);
    }
    affiliationCtrl.updateValueAndValidity({ emitEvent: false });
  }

  private cachedTribalAffiliationList = signal<Concept[] | null>(null); // Cached as a signal, fetched only once

  getTribalAffiliationList(): Signal<Concept[]> {
    if (!this.cachedTribalAffiliationList()) {
      this.http.get(`${this.environmentHandler.getBaseApiURL()}valuesets/tribal-affiliation`).pipe(
        map((response: any) => response.results),
        catchError(error => {
          console.error(error);
          this.sharedHttpErrorService.setErrorMessage("Error Receiving Data From Service.");
          return throwError(() => error);
        })
      ).subscribe((data: Concept[]) => this.cachedTribalAffiliationList.set(data));
    }
    // Return a readonly signal to prevent external mutation
    return this.cachedTribalAffiliationList.asReadonly() as Signal<Concept[]>;
  }
}
