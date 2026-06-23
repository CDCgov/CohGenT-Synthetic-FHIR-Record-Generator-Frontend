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

  useCase!: UseCase;
  form: FormGroup = new FormGroup({});
  originalForm: FormGroup = new FormGroup({});
  protected readonly UI_CONSTANTS = UI_CONSTANTS;

  protected cohortService: CohortService = inject(CohortService);
  protected weightingHelperService: WeightingHelperService = inject(WeightingHelperService);
  private formManagerService: FormManagerService = inject(FormManagerService);
  private dialog: MatDialog = inject(MatDialog);
  private utils = inject(Utils);
  protected stepLockTracker = inject(StepperLockTracker);
  private medicationServiceHelper = inject(MedicationHelperService);

  cohortGeneratedSuccessfully = signal(false);
  generatedCohortResponse: WritableSignal<any> = signal(null);
  isCustomizingDefaults = signal(false);
  formValue = signal<any>({});

  @ViewChild('stepper') stepper!: MatStepper;

  constructor() {
    effect(() => {
      this.useCase = this.cohortService.cohortData()!.selectedUseCase;
      this.form = this.formManagerService.buildForm(this.useCase.formRules, this.cohortService.cohortData()?.formValue);
      this.originalForm = this.formManagerService.buildForm(this.useCase.formRules);
    });
  }

  ngOnDestroy(): void {
    this.stepLockTracker.setStepperLock(false);
  }

  ngAfterViewInit(): void {
    if (this.cohortService.cohortData()?.isImported && this.stepper) {
      const reviewCohortIndex =
        this.cohortService.cohortData()?.selectedUseCase?.formRules?.find(rule=> rule.type === 'review')?.stepOrder - 1;
      // Always transition to the Review Cohort page when importing a cohort
      this.stepper.selectedIndex = reviewCohortIndex ?? 0;
    }
    this.form.valueChanges.subscribe(() => {
      this.cohortGeneratedSuccessfully.set(false);
    });
    // Set initial value
    this.formValue.set(this.form.getRawValue());
  }

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

  onViewCohortSummary() {
    openConfirmationSummaryModal(this.dialog, this.generatedCohortResponse()).subscribe();
  }

  onSubmit() {
    this.cohortGeneratedSuccessfully.set(false);
    this.form.markAllAsTouched();
    console.log(this.form.value)
    if (this.form.invalid) {
      console.error("Invalid form")
      console.log(this.form);
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

    this.cohortService.generateCohort(cohortGenerationRequestBody).subscribe({
      next: response => {
        this.cohortGeneratedSuccessfully.set(true);
        this.generatedCohortResponse.set(response);
      },
      error: err => {
        this.cohortGeneratedSuccessfully.set(false);
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

  onNext(index: number) {
    this.form.get(`step_${index}`).markAllAsTouched();
    this.form.get(`step_${index}`).updateValueAndValidity();
    if(!this.form.get(`step_${index}`).invalid) {
      this.stepper.next();
      this.formManagerService.setCurrentStep(this.stepper.selectedIndex);
    }

  }

  onFormRuleSelected(selectedStepIndex: number) {
    this.stepper.selectedIndex = selectedStepIndex;
  }

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

  onBack() {
    this.stepper.previous();
    this.formManagerService.setCurrentStep(this.stepper.selectedIndex);
  }

}
