import {inject, Injectable} from '@angular/core';
import {FormRule, Option} from '../models/use-case';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RangeHelperService} from './form-helpers/range-helper.service';
import {WeightingHelperService} from './form-helpers/weighting-helper.service';
import {ConceptHelperService} from './form-helpers/concept-helper.service';
import {RelativeTimeRangeHelperService} from './form-helpers/relative-time-range-helper.service';
import {MedicationHelperService} from './form-helpers/medication-helper.service';
import {AdditionalDataHelperService} from './form-helpers/additional-data-helper.service';
import {GenerateCohortHelperService} from './form-helpers/generate-cohort-helper.service';
import {BehaviorSubject} from 'rxjs';
import {SYSTEM_LIST} from '../../../constants/app-constants';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';
import {TribalAffiliationHelperService} from './form-helpers/tribal-affiliation-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FormManagerService {

  private fb = inject(FormBuilder);
  private rangeHelperService = inject(RangeHelperService);
  private weightingHelperService = inject(WeightingHelperService);
  private conceptHelperService = inject(ConceptHelperService);
  private relativeTimeRangeHelperService = inject(RelativeTimeRangeHelperService);
  private medicationServiceHelper = inject(MedicationHelperService);
  private additionalDataHelperService = inject(AdditionalDataHelperService);
  private generateCohortHelperService: GenerateCohortHelperService = inject(GenerateCohortHelperService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private patientTribalAffiliationHelperService = inject(TribalAffiliationHelperService);

  private formTracker = new BehaviorSubject<any>(null);
  formTracker$ = this.formTracker.asObservable();
  setFormData(formValue: any) {
    this.formTracker.next(formValue);
  }
  getFormData(): any {
    return this.formTracker.getValue();
  }

  private stepTracker = new BehaviorSubject<number>(0);
  stepTracker$ = this.formTracker.asObservable();
  setCurrentStep(index: number) {
    this.stepTracker.next(index);
  }
  getCurrentStep(): number {
    return this.stepTracker.getValue();
  }

  buildForm(formRules: FormRule[], importedValue?: any): FormGroup {
    const form = new FormGroup({});

    try {
      formRules.forEach((formRule: FormRule, index: number) => {
        this.addStepControl(form, formRule, index, importedValue);
      });
    } catch (error) {
      this.sharedHttpErrorService.setErrorMessage('Invalid form data. Please check your imported file and try again.');
      this.sharedHttpErrorService.showErrorComponent();
      return new FormGroup({});
    }

    return form;
  }

  private addStepControl(form: FormGroup, formRule: FormRule, index: number, importedValue?: any): void {
    const stepKey = `step_${index}`;
    form.addControl(stepKey, new FormGroup({}));
    const stepControl = form.get(stepKey);

    if (stepControl instanceof FormGroup) {
      const control = this.buildFromGroups(formRule.options);

      if (formRule.type === 'custom') {
        if(importedValue){
          control.patchValue(importedValue?.[`step_${index}`]?.[`custom_${index}`]);
        }
        stepControl.addControl(`custom_${index}`, control);
      } else if (formRule.type === 'medication') {
        stepControl.addControl(formRule.type, this.fb.array([]));
        if(importedValue?.[`step_${index}`]?.['medication']?.length > 0){
          this.medicationServiceHelper.importMedicationSets(stepControl.get(['medication']) as FormArray, importedValue?.[`step_${index}`]?.['medication']);
        }
      } else if (formRule.type === 'additional-data-time-series') {
        stepControl.addControl(formRule.type, this.fb.array([]));
        if(importedValue?.[`step_${index}`]?.['additional-data-time-series']?.length > 0){
          this.additionalDataHelperService.importAdditionalData(stepControl.get(['additional-data-time-series']) as FormArray, importedValue?.[`step_${index}`]?.['additional-data-time-series']);
        }
      }
      else if (formRule.type === 'generate') {
        const fg = this.generateCohortHelperService.buildFg(importedValue?.[`step_${index}`]?.['generate']);
        stepControl.addControl(formRule.type, fg);
      }
      if(importedValue){
        stepControl.markAsTouched()
      }
    } else {
      console.error(`${stepKey} is not a FormGroup or is null`);
    }
  }


  private buildFromGroups(options: Option[] | undefined): FormGroup {
    let form: FormGroup = new FormGroup({});
    if (!options?.length) {
      return form;
    }
    options?.forEach(option => {
      if (option.control === "checkbox") {
        form.addControl(option.ruleId, new FormControl(option.defaultState));
      } else if (option.control === "weighting") {
        form.addControl(option.ruleId, this.weightingHelperService.buildFg(option));
      } else if (option.control === 'range') {
        form.addControl(option.ruleId, this.rangeHelperService.getRangeFg(option));
      } else if (option.control === 'tribal-affiliation') {
        form.addControl(option.ruleId, this.patientTribalAffiliationHelperService.getPatientTribalAffiliationFg(option));
      } else if (option.control === 'location') {
        form.addControl(option.ruleId, this.getLocationFg());
      } else if (option.control === 'concept') {
        if(option.ruleId == 'condition-code'){
          // condition code always has a SNOMED default system
          const  DEFAULT_SYSTEM = SYSTEM_LIST.find(system => system.label === "SNOMED CT");
          form.addControl(option.ruleId, this.conceptHelperService.buildFg(DEFAULT_SYSTEM));
        }
        else {
          form.addControl(option.ruleId, this.conceptHelperService.buildFg());
        }
      } else if (option.control === 'relative-time-range') {
        form.addControl(option.ruleId, this.relativeTimeRangeHelperService.buildFg(option));
      }
    });
    return form;
  }

  private getLocationFg():FormGroup {
    let fg = this.fb.group({});
    fg.addControl('city', new FormControl());
    fg.addControl('state', new FormControl());
    return fg;
  }

}
