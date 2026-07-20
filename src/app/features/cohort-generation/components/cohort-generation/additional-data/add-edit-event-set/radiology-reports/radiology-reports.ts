/**
 * Component for managing radiology report entries within an event set.
 * Handles displaying and deleting radiology report concepts with their associated data.
 */
import {Component, input, output} from '@angular/core';
import {ConceptFormComponent} from "../../../form-primitives/concept-form/concept-form.component";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {UI_CONSTANTS} from '../../../../../../../constants/ui-constants';
import {FormArray, isFormGroup} from '@angular/forms';

@Component({
  selector: 'app-radiology-reports',
  imports: [
    ConceptFormComponent,
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './radiology-reports.html',
  styleUrl: './radiology-reports.scss',
})
export class RadiologyReports {
  /** Form array containing radiology report form groups */
  radiologyReportFormArray = input<FormArray>()

  /** Emits to the parent when a radiology report is deleted with its index */
  onDeleteRadiologyReport = output<number>()

  /** UI constants for labels and messages */
  protected readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Helper function to check if a control is a FormGroup */
  protected readonly isFormGroup = isFormGroup;
}
