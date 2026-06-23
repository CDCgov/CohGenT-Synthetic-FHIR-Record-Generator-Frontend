import {Component, input, output} from '@angular/core';
import {ConceptFormComponent} from '../../../generic-forms/concept-form/concept-form.component';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {FormArray, isFormGroup} from '@angular/forms';
import {UI_CONSTANTS} from '../../../../../../../constants/ui-constants';

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
  radiologyReportFormArray = input<FormArray>()
  onDeleteRadiologyReport = output<number>()
  protected readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;
  protected readonly isFormGroup = isFormGroup;
}
