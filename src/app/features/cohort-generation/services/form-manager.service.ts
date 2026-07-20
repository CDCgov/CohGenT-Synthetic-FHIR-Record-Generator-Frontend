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
import {OccupationHelperService} from './form-helpers/occupation-helper.service';

/**
 * Central orchestrator service for the multi-step cohort generation form.
 *
 * This service is responsible for:
 * - Building the complete form structure from FormRules defined in use cases
 * - Delegating control creation to specialized helper services based on control types
 * - Managing form state and current step tracking via BehaviorSubjects
 * - Handling import/export of saved form configurations
 * - Coordinating between 9+ helper services for different control types
 *
 * Form Structure:
 * The form is organized as a multi-step wizard with the following hierarchy:
 * - Root FormGroup
 *   - step_0: FormGroup (Use Case Selection)
 *   - step_1: FormGroup (Cohort Information)
 *     - custom_1: FormGroup (contains various Option controls)
 *   - step_2: FormGroup (Medications)
 *     - medication: FormArray (medication sets)
 *   - step_3: FormGroup (Additional Data)
 *     - additional-data-time-series: FormArray (event sets)
 *   - step_4: FormGroup (Generate)
 *     - generate: FormGroup (cohort size, output format, etc.)
 *
 * Control Types Supported:
 * - checkbox: Simple boolean controls
 * - weighting: Distribution controls with proportional adjustment
 * - range: Min/max numeric ranges with dual slider/input
 * - tribal-affiliation: Tribal affiliation with prevalence and random assignment
 * - location: City and state selection
 * - concept: Medical concept search (SNOMED, LOINC, RxNorm, etc.)
 * - relative-time-range: Time ranges with start/end periods
 *
 * Helper Services:
 * - RangeHelperService: Numeric ranges
 * - WeightingHelperService: Distribution weights
 * - ConceptHelperService: Medical concepts
 * - RelativeTimeRangeHelperService: Time ranges
 * - MedicationHelperService: Medication sets
 * - AdditionalDataHelperService: Event sets
 * - GenerateCohortHelperService: Generation parameters
 * - TribalAffiliationHelperService: Tribal affiliation
 */
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
  private occupationHelperService = inject(OccupationHelperService);

  private formTracker = new BehaviorSubject<any>(null);
  /** Observable stream of form data changes. */
  formTracker$ = this.formTracker.asObservable();

  /** Updates the tracked form data. */
  setFormData(formValue: any) {
    this.formTracker.next(formValue);
  }

  /** Retrieves the current form data. */
  getFormData(): any {
    return this.formTracker.getValue();
  }

  private stepTracker = new BehaviorSubject<number>(0);
  /** Observable stream of current step index changes. */
  stepTracker$ = this.formTracker.asObservable();

  /** Sets the current step index. */
  setCurrentStep(index: number) {
    this.stepTracker.next(index);
  }

  /** Retrieves the current step index. */
  getCurrentStep(): number {
    return this.stepTracker.getValue();
  }

  /**
   * Builds the complete multi-step form from FormRules configuration.
   *
   * This is the main entry point for form construction. It iterates through the FormRules
   * array (typically from a UseCase) and creates a step control for each rule.
   *
   * @param formRules - Array of FormRule objects defining each step's structure
   * @param importedValue - Optional saved form data to restore previous state
   * @returns FormGroup containing all step controls, or empty FormGroup on error
   *
   * Error Handling:
   * - Catches exceptions during form construction
   * - Displays user-friendly error message via SharedHttpErrorService
   * - Returns empty FormGroup to prevent application crash
   *
   * Example FormRules:
   * [
   *   { type: 'custom', options: [...] },      // Step 0: Use case selection
   *   { type: 'custom', options: [...] },      // Step 1: Cohort info
   *   { type: 'medication', options: [] },     // Step 2: Medications
   *   { type: 'additional-data-time-series' }, // Step 3: Additional data
   *   { type: 'generate', options: [] }        // Step 4: Generate
   * ]
   */
  buildForm(formRules: FormRule[], importedValue?: any): FormGroup {
    const form = new FormGroup({});

    try {
      formRules.forEach((formRule: FormRule, index: number) => {
        this.addStepControl(form, formRule, index, importedValue);
      });
    } catch (error) {
      this.sharedHttpErrorService.handleError(error, 'Invalid form data. Please check your imported file and try again.');
      return new FormGroup({});
    }

    return form;
  }

  /**
   * Adds a step control to the form based on the FormRule type.
   *
   * Each step is added as a FormGroup with key `step_${index}`. The content of the step
   * depends on the FormRule type:
   *
   * FormRule Types:
   *
   * 1. 'custom': Standard form with various control types
   *    - Creates a FormGroup from options using buildFromGroups()
   *    - Stored under key `custom_${index}`
   *    - Supports: checkbox, weighting, range, concept, location, etc.
   *
   * 2. 'medication': Medication sets management
   *    - Creates an empty FormArray
   *    - Populated via MedicationHelperService.importMedicationSets() if importing
   *    - Each array item is a medication set with timing, dosage, etc.
   *
   * 3. 'additional-data-time-series': Event sets management
   *    - Creates an empty FormArray
   *    - Populated via AdditionalDataHelperService.importAdditionalData() if importing
   *    - Each array item is an event set with concepts and timing
   *
   * 4. 'generate': Cohort generation parameters
   *    - Creates a FormGroup via GenerateCohortHelperService.buildFg()
   *    - Contains: cohort size, output format, file name, etc.
   *
   * @param form - The root FormGroup to add the step to
   * @param formRule - The FormRule defining this step's structure
   * @param index - The step index (0-based)
   * @param importedValue - Optional saved data for this step
   */
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


  /**
   * Builds a FormGroup from an array of Options by delegating to specialized helper services.
   *
   * This method is examining each Option's control type and calling the
   * appropriate helper service to create the corresponding FormControl or FormGroup.
   *
   * Control Type Mapping:
   *
   * - 'checkbox': Simple FormControl with boolean value
   *   - Uses option.defaultState for initial value
   *
   * - 'weighting': Distribution weights (e.g., gender, race)
   *   - Delegates to WeightingHelperService.buildFg()
   *   - Creates slider + inputs or lockable multi-value controls
   *
   * - 'range': Numeric min/max ranges (e.g., age)
   *   - Delegates to RangeHelperService.getRangeFg()
   *   - Creates dual slider/input controls with validation
   *
   * - 'tribal-affiliation': Tribal affiliation selection
   *   - Delegates to TribalAffiliationHelperService.getPatientTribalAffiliationFg()
   *   - Includes prevalence and random assignment options
   *
   * - 'location': Geographic location
   *   - Delegates to getLocationFg()
   *   - Creates city and state controls
   *
   * - 'concept': Concept search (conditions, observations, procedures)
   *   - Delegates to ConceptHelperService.buildFg()
   *   - Special case: 'condition-code' always uses SNOMED CT system
   *   - Supports multiple coding systems (SNOMED, LOINC, RxNorm, etc.)
   *
   * - 'relative-time-range': Time ranges
   *   - Delegates to RelativeTimeRangeHelperService.buildFg()
   *   - Creates start/end controls with value and unit
   *
   * @param options - Array of Option objects defining controls to create
   * @returns FormGroup containing all created controls, or empty FormGroup if no options
   */
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
      } else if (option.control === 'occupation') {
        form.addControl(option.ruleId, this.occupationHelperService.getPatientOccupationFg(option));
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

  /** Creates a location FormGroup with city and state controls. */
  private getLocationFg():FormGroup {
    let fg = this.fb.group({});
    fg.addControl('city', new FormControl());
    fg.addControl('state', new FormControl());
    return fg;
  }

}
