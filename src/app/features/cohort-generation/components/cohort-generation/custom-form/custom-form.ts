/**
 * Component for rendering dynamic custom forms with various field types.
 * Displays form primitives based on use case options including checkboxes, ranges, weighting, location, and concepts.
 */
import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../../../models/use-case';
import {MatIconModule} from "@angular/material/icon";
import {MatDivider} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CheckboxFormComponent} from '../form-primitives/checkbox-form/checkbox-form.component';
import {RangeFormComponent} from '../form-primitives/range-form/range-form.component';
import {WeightingFormComponent} from '../form-primitives/weighting-form/weighting-form.component';
import {LocationFormComponent} from '../form-primitives/location-form/location-form.component';
import {ConceptFormComponent} from '../form-primitives/concept-form/concept-form.component';
import {AsFormGroupPipe} from '../../../../../shared/pipes/as-form-group-pipe';
import {RelativeTimeRangeComponent} from '../form-primitives/relative-time-range/relative-time-range.component';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {TribalAffiliation} from '../form-primitives/tribal-affiliation/tribal-affiliation.component';
import {OccupationForm} from '../form-primitives/occupation-form/occupation-form';

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
    RelativeTimeRangeComponent,
    TribalAffiliation,
    OccupationForm
  ],
  templateUrl: './custom-form.html',
  styleUrls: ['./custom-form.scss']
})
export class CustomForm{
  /** Index of the current form in a collection of forms */
  index = input.required<number>()

  /** The reactive form group containing form controls */
  form = input.required<FormGroup>();

  /** The original form group for comparison or reset purposes */
  originalFrom = input.required<FormGroup>();

  /** Array of options defining the form fields to render */
  options = input<Option[]>();

  /** Hint text for concept field inputs */
  readonly CONCEPT_HINTS =  UI_CONSTANTS.COHORT_GENERATION.CONDITION.CONCEPT_HINTS;

  /** Hint text for search term inputs */
  readonly SEARCH_TERM_HINT =  UI_CONSTANTS.COHORT_GENERATION.CONDITION.SEARCH_TERM_HINT;
}
