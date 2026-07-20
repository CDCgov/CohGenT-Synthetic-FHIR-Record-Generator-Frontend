/**
 * Component for managing multi-step cohort generation forms with stepper navigation.
 * Coordinates form state, validation, navigation, and cohort generation workflow.
 */
import {
  AfterViewInit,
  Component,
  effect,
  inject, OnDestroy,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UseCase} from '../../../models/use-case';
import {CohortGenerationRequestBody} from '../../../models/cohort-generation-request-body';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CustomForm} from '../custom-form/custom-form';
import {StepSelectorComponent} from './step-selector/step-selector.component';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {AdditionalDataComponent} from '../additional-data/additional-data.component';
import {FormManagerService} from '../../../services/form-manager.service';
import {CohortService} from '../../../services/cohort.service';
import {ReviewCohortComponent} from '../review-cohort/review-cohort.component';
import {GenerateCohortComponent} from '../generate-cohort/generate-cohort.component';
import {DefaultsSummaryComponent} from '../defaults-summary/defaults-summary';
import {DatePipe} from '@angular/common';
import {CohortInfoComponent} from '../cohort-info/cohort-info.component';
import {MedicationsComponent} from '../medications/medications.component';
import {RuleTitlePipe} from '../../../pipes/rule-title-pipe';
import {RuleDescriptionPipe} from '../../../pipes/rule-description-pipe';
import {openConfirmationSummaryModal} from '../generation-summary-modal/generation-summary-modal';
import {MatDialog} from '@angular/material/dialog';
import {WeightingHelperService} from '../../../services/form-helpers/weighting-helper.service';
import {Utils} from '../../../services/utils.service';
import {MatTooltip} from '@angular/material/tooltip';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {StepperLockTracker} from '../../../services/form-helpers/stepper-lock-tracker';
import {MedicationHelperService} from '../../../services/form-helpers/medication-helper.service';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {SharedHttpErrorService} from '../../../../../shared/services/shared-http-error.service';

@Component({
  selector: 'app-form-manager',
  imports: [
    MatButton,
    MatStep,
    MatStepper,
    ReactiveFormsModule,
    MatFormFieldModule,
    CustomForm,
    StepSelectorComponent,
    MatIcon,
    MatProgressBar,
    AdditionalDataComponent,
    ReviewCohortComponent,
    GenerateCohortComponent,
    CohortInfoComponent,
    MedicationsComponent,
    RuleTitlePipe,
    RuleDescriptionPipe,
    DefaultsSummaryComponent,
    MatTooltip
  ],
  providers: [DatePipe],
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss', '../cohort-generation.component.scss'],
})
export class FormManagerComponent implements AfterViewInit, OnDestroy {

  /** The selected use case defining the form structure */
  useCase!: UseCase;

  /** The main reactive form containing all step forms */
  form: FormGroup = new FormGroup({});

  /** Copy of the original form for comparison/reset purposes */
  originalForm: FormGroup = new FormGroup({});

  /** UI constants for display text and configuration */
  protected readonly UI_CONSTANTS = UI_CONSTANTS;

  /** Service for cohort generation and data management */
  protected cohortService: CohortService = inject(CohortService);

  /** Service for managing HTTP error display */
  private sharedHttpErrorService= inject(SharedHttpErrorService);

  /** Service for weighting form helpers and validation */
  protected weightingHelperService: WeightingHelperService = inject(WeightingHelperService);

  /** Service for form building and management */
  private formManagerService: FormManagerService = inject(FormManagerService);

  /** Material dialog service for opening modals */
  private dialog: MatDialog = inject(MatDialog);

  /** Utility service for common operations */
  private utils = inject(Utils);

  /** Service for tracking which stepper steps are locked */
  protected stepLockTracker = inject(StepperLockTracker);

  /** Service for medication-specific form helpers */
  private medicationServiceHelper = inject(MedicationHelperService);

  /** Signal indicating if cohort was successfully generated */
  cohortGeneratedSuccessfully = signal(false);

  /** Signal indicating if cohort generation is in progress */
  isLoading = signal(false);

  /** Signal containing the generated cohort response data */
  generatedCohortResponse: WritableSignal<any> = signal(null);

  /** Signal indicating if user is customizing default values */
  isCustomizingDefaults = signal(false);

  /** Signal containing current form values */
  formValue = signal<any>({});

  /** Reference to the Material stepper component */
  @ViewChild('stepper') stepper!: MatStepper;

  /** Constructor that sets up reactive effects for form initialization */
  constructor() {
    effect(() => {
      this.useCase = this.cohortService.cohortData()!.selectedUseCase;
      this.form = this.formManagerService.buildForm(this.useCase.formRules, this.cohortService.cohortData()?.formValue);
      this.originalForm = this.formManagerService.buildForm(this.useCase.formRules);
    });
  }

  /** Cleanup method that unlocks stepper when component is destroyed */
  ngOnDestroy(): void {
    this.stepLockTracker.setStepperLock(false);
  }

  /** Initializes view after rendering, sets up form subscriptions and handles imported cohorts */
  ngAfterViewInit(): void {
    if (this.cohortService.cohortData()?.isImported && this.stepper) {
      const reviewCohortIndex =
        this.cohortService.cohortData()?.selectedUseCase?.formRules?.find(rule=> rule.type === 'review')?.stepOrder - 1;
      // Always transition to the Review Cohort page when importing a cohort
      this.stepper.selectedIndex = reviewCohortIndex ?? 0;
    }
    this.form.valueChanges.subscribe(() => {
      this.cohortGeneratedSuccessfully.set(false);
      this.formValue.set(this.form.getRawValue());
    });
    // Set initial value
    this.formValue.set(this.form.getRawValue());
  }

  /** Downloads the generated cohort as a ZIP file */
  onDownloadCohort() {
    let base64Content = this.generatedCohortResponse().data;
    const binaryContent = atob(base64Content);
    const binaryArray = new Uint8Array(binaryContent.length);

    for (let i = 0; i < binaryContent.length; i++) {
      binaryArray[i] = binaryContent.charCodeAt(i);
    }

    const blob = new Blob([binaryArray], {type: 'application/zip'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${this.cohortService.cohortData()!.metadata.cohortName.trim()}.zip`;
    link.click();

    URL.revokeObjectURL(link.href);
  }

  /** Opens a modal to view the cohort generation summary */
  onViewCohortSummary() {
    openConfirmationSummaryModal(this.dialog, this.generatedCohortResponse(), this.sharedHttpErrorService).subscribe();
  }

  /** Submits the form and generates the cohort */
  onSubmit() {
    this.cohortGeneratedSuccessfully.set(false);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const cohortGenerationRequestBody: CohortGenerationRequestBody =
      new CohortGenerationRequestBody(
        this.form,
        this.useCase,
        this.cohortService.cohortData()!.metadata,
        this.weightingHelperService.units(),
        this.utils
      );
    this.isLoading.set(true);
    this.cohortService.generateCohort(cohortGenerationRequestBody).subscribe({
      next: response => {
        this.cohortGeneratedSuccessfully.set(true);
        this.generatedCohortResponse.set(response);
        this.isLoading.set(false);
      },
      error: err => {
        this.cohortGeneratedSuccessfully.set(false);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Handle stepper selection change event.
   * Validates the previous step (the one being navigated away from).
   */
  onStepChange(event: StepperSelectionEvent): void {
    // Validate the previous step when navigating away from it
    const previousStepIndex = event.previouslySelectedIndex;
    const previousStepControl = this.form.get(`step_${previousStepIndex}`);

    if (previousStepControl) {
      previousStepControl.markAllAsTouched();

      // Check if the previous step was the medication step and validate weight sum
      const previousRule = this.useCase?.formRules[previousStepIndex];
      if (previousRule?.type === 'medication') {
        const medicationArray = previousStepControl.get('medication') as FormArray;
        if (medicationArray) {
          this.medicationServiceHelper.validateWeightSum(medicationArray);
        }
      }
    }
  }

  /** Validates current step and navigates to the next step if valid */
  onNext(index: number) {
    this.form.get(`step_${index}`).markAllAsTouched();
    this.form.get(`step_${index}`).updateValueAndValidity();
    if(!this.form.get(`step_${index}`).invalid) {
      this.stepper.next();
      this.formManagerService.setCurrentStep(this.stepper.selectedIndex);
    }

  }

  /** Navigates to a specific step in the stepper */
  onFormRuleSelected(selectedStepIndex: number) {
    this.stepper.selectedIndex = selectedStepIndex;
  }

  /** Exports the current cohort configuration as a JSON file */
  onExportCohortConfiguration() {
    // remove isImported key here, it is not relevant when we export data
    const { isImported, ...selectedUseCaseWithoutImported } = this.cohortService.cohortData()!.selectedUseCase as any;

    const exportData = {
      selectedUseCase: selectedUseCaseWithoutImported,
      formValue: this.form.getRawValue(),
      metadata: this.cohortService.cohortData()!.metadata
    };

    const blob = new Blob([JSON.stringify(exportData)], {type: 'application/json'});
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = `${this.cohortService.cohortData()!.metadata.cohortName.trim()}.cohortsettings.json`;
    document.body.appendChild(link);
    link.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  /** Toggles between customizing defaults and viewing summary */
  toggleCustomizing() {
    this.isCustomizingDefaults.set(!this.isCustomizingDefaults());
    this.formValue.set(this.form.getRawValue());
  }

  /**
   * Recursively checks if all controls in a FormGroup or FormArray are touched
   */
  areAllControlsTouched(formGroup: FormGroup | FormArray): boolean {
    return this.utils.areAllControlsTouched(formGroup);
  }

  /** Navigates to the previous step in the stepper */
  onBack() {
    this.stepper.previous();
    this.formManagerService.setCurrentStep(this.stepper.selectedIndex);
  }

}
