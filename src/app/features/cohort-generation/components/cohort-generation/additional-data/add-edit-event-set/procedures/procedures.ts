/**
 * Component for managing procedure entries within an event set.
 * Handles displaying and deleting procedure concepts with their associated data.
 */
import {Component, input, output} from '@angular/core';
import {ConceptFormComponent} from "../../../form-primitives/concept-form/concept-form.component";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {UI_CONSTANTS} from '../../../../../../../constants/ui-constants';
import {FormArray, isFormGroup} from '@angular/forms';

@Component({
  selector: 'app-procedures',
    imports: [
        ConceptFormComponent,
        MatIcon,
        MatMiniFabButton,
        MatTooltip
    ],
  templateUrl: './procedures.html',
  styleUrl: './procedures.scss',
})
export class Procedures {
  /** Form array containing procedure form groups */
  procedureFormArray = input<FormArray>()

  /** Emits when a procedure is deleted with its index */
  onDeleteProcedure = output<number>()

  /** UI constants for labels and messages */
  protected readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Helper function to check if a control is a FormGroup */
  protected readonly isFormGroup = isFormGroup;
}
