/**
 * Component for managing cohort generation settings and execution.
 * Provides controls for cohort size, seed value, generation options, and displays generation results.
 */
import {Component, inject, input, output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {GenerateCohortHelperService} from '../../../services/form-helpers/generate-cohort-helper.service';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {ErrorMessageComponent} from '../../../../../shared/components/error-message/error-message.component';


@Component({
  selector: 'app-generate-cohort',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSlider,
    MatSliderThumb,
    MatButton,
    MatSelectModule,
    MatCardModule,
    MatIcon,
    MatTooltip,
    DatePipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    ErrorMessageComponent,
  ],
  templateUrl: './generate-cohort.component.html',
  styleUrls: ['./generate-cohort.component.scss', '../cohort-generation.component.scss'],
})
export class GenerateCohortComponent {
  /** The form group containing cohort generation controls */
  form = input.required<FormGroup>();

  /** Whether an http call is currently in progress */
  isLoading = input<boolean>(false);

  /** Whether the cohort was generated successfully */
  cohortGeneratedSuccessfully = input.required<boolean>();

  /** Information about the generated cohort including timestamp and name */
  cohortInfo = input.required<{timestamp: string, name: string} | null>();

  /** Event emitted when the form is submitted to generate a cohort */
  formSubmit = output();

  /** Event emitted when the user requests to download the generated cohort */
  onDownloadCohort = output();

  /** Event emitted when the user requests to view the generation summary */
  onViewSummary = output();

  /** UI labels for the confirm and generate section */
  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.CONFIRM_AND_GENERATE;

  /** Error message constants for validation */
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG

  /** Service for cohort generation form helpers and validation */
  generateCohortHelperService: GenerateCohortHelperService = inject(GenerateCohortHelperService);

  /** Handles form submission to generate a cohort */
  onSubmit() {
    this.formSubmit.emit()
  }

  /** Generates a new random 10-digit seed value and updates the form */
  onGenerateNewRandomSeed() {
    this.form().controls['seed'].patchValue(this.generateCohortHelperService.generateRandom10DigitNumber());
  }

}
