import {
  AfterViewInit,
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatStep, MatStepper, MatStepperPrevious} from '@angular/material/stepper';
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

@Component({
  selector: 'app-form-manager',
  imports: [
    MatButton,
    MatStep,
    MatStepper,
    ReactiveFormsModule,
    MatFormFieldModule,
    CustomForm,
    MatStepperPrevious,
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
    DefaultsSummaryComponent
  ],
  providers: [DatePipe],
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss', '../cohort-generation.component.scss'],
})
export class FormManagerComponent implements AfterViewInit {

  useCase!: UseCase;
  form: FormGroup = new FormGroup({});
  originalForm: FormGroup = new FormGroup({});

  protected cohortService: CohortService = inject(CohortService);
  protected weightingHelperService: WeightingHelperService = inject(WeightingHelperService);
  private formManagerService: FormManagerService = inject(FormManagerService);
  private dialog: MatDialog = inject(MatDialog);
  private utils = inject(Utils);

  cohortGeneratedSuccessfully = signal(false);
  generatedCohortResponse: WritableSignal<any> = signal(null);
  isCustomizingDefaults = signal(false);

  @ViewChild('stepper') stepper!: MatStepper;

  formValue = signal<any>({});

  constructor() {
    effect(() => {
      this.useCase = this.cohortService.cohortData()!.selectedUseCase;
      this.form = this.formManagerService.buildForm(this.useCase.formRules, this.cohortService.cohortData()?.formValue);
      this.originalForm = this.formManagerService.buildForm(this.useCase.formRules);
    });
  }

  ngAfterViewInit(): void {
    if (this.cohortService.cohortData()?.isImported && this.stepper) {
      const reviewCohortIndex =
        this.cohortService.cohortData()?.selectedUseCase?.formRules?.find(rule=> rule.type === 'review')?.stepOrder - 1;
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
    openConfirmationSummaryModal(this.dialog, this.generatedCohortResponse()).subscribe({
      next: val => {
        console.log(val)
      }
    });
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

  onNext(index: number) {
    const stepFg = this.form.get(`step_${index}`) as FormGroup;
    stepFg.markAllAsTouched();
    stepFg.updateValueAndValidity();

    if (stepFg.valid) {
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

  onConfirmDefaults(checked: boolean) {
    console.log('Defaults confirmed', checked);
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
    this.formManagerService.setCurrentStep(this.stepper.selectedIndex);
  }
}
