import {Component, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ConceptFormComponent} from '../../generic-forms/concept-form/concept-form.component';
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
  medicationForm = input.required<FormGroup>();
  index = input.required<number>();
  delete = output<void>();

  readonly MEDICATIONS_CONST =  UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;
}
