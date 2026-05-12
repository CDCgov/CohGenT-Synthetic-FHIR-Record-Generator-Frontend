import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../../../models/use-case';
import {MatIconModule} from "@angular/material/icon";
import {MatDivider} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CheckboxFormComponent} from '../simple-forms/checkbox-form/checkbox-form.component';
import {RangeFormComponent} from '../simple-forms/range-form/range-form.component';
import {WeightingFormComponent} from '../simple-forms/weighting-form/weighting-form.component';
import {LocationFormComponent} from '../simple-forms/location-form/location-form.component';
import {ConceptFormComponent} from '../simple-forms/concept-form/concept-form.component';
import {AsFormGroupPipe} from '../../../../../shared/pipes/as-form-group-pipe';
import {RelativeTimeRangeComponent} from '../simple-forms/relative-time-range/relative-time-range.component';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';

@Component({
  selector: 'app-custom-form',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatDivider,
    MatTooltipModule,
    CheckboxFormComponent,
    RangeFormComponent,
    WeightingFormComponent,
    LocationFormComponent,
    ConceptFormComponent,
    AsFormGroupPipe,
    RelativeTimeRangeComponent
  ],
  templateUrl: './custom-form.html',
  styleUrls: ['./custom-form.scss']
})
export class CustomForm{
  index = input.required<number>()
  form = input.required<FormGroup>();
  originalFrom = input.required<FormGroup>();
  options = input<Option[]>();
  readonly CONCEPT_HINTS =  UI_CONSTANTS.COHORT_GENERATION.CONDITION.CONCEPT_HINTS;
  readonly SEARCH_TERM_HINT =  UI_CONSTANTS.COHORT_GENERATION.CONDITION.SEARCH_TERM_HINT;
}
