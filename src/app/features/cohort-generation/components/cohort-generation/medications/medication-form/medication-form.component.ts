/**
 * Component for displaying and editing a single medication within a medication set.
 * Provides form controls for medication concept selection, dosage, frequency, and weight.
 */
import {Component, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ConceptFormComponent} from '../../form-primitives/concept-form/concept-form.component';
import {MatMiniFabButton} from '@angular/material/button';
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from '@angular/material/icon';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {MatTooltip} from '@angular/material/tooltip';
import {ChipsPipe} from '../../../../pipes/chips-pipe';


@Component({
  selector: 'app-medication-form',
  imports: [ReactiveFormsModule, ConceptFormComponent, MatFormField, MatInput, MatMiniFabButton, MatIcon, MatTooltip, ChipsPipe,],
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.scss', '../../cohort-generation.component.scss']
})
export class MedicationFormComponent{
  /** The form group containing the medication data (concept, dosage, frequency, weight) */
  medicationForm = input.required<FormGroup>();

  /** The index of this medication in the medications array */
  index = input.required<number>();

  /** Event emitted when the delete button is clicked to remove this medication */
  delete = output<void>();

  /** UI constants for medication labels and messages */
  readonly MEDICATIONS_CONST =  UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;
}
