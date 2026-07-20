/**
 * Component for managing onset time range selection with radio buttons and time period units.
 * Provides options for specifying time ranges with configurable units from TIME_PERIOD_UNIT_LIST.
 */
import {Component, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatInput} from "@angular/material/input";
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-onset-time-range',
  imports: [
    FormsModule,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './onset-time-range.component.html',
  styleUrls: ['../../cohort-generation.component.scss', './onset-time-range.component.scss']
})
export class OnsetTimeRangeComponent {
  /** The form group containing onset time range controls */
  form = input.required<FormGroup>();

  /** List of available time period units (days, weeks, months, years) */
  protected readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;
}
