import {Component, input, output} from '@angular/core';
import {ConceptFormComponent} from "../../../generic-forms/concept-form/concept-form.component";
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
  procedureFormArray = input<FormArray>()
  onDeleteProcedure = output<number>()
  protected readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;
  protected readonly isFormGroup = isFormGroup;
}
