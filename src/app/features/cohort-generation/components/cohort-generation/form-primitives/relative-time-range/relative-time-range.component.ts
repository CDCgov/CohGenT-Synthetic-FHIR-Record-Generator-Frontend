/**
 * Component for managing relative time range selection with before/after options.
 * Provides input fields for specifying time ranges relative to a reference point with configurable units.
 */
import {Component, input} from '@angular/core';
import {
  FormGroup, FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {Option} from '../../../../models/use-case';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatOption, MatSelect} from '@angular/material/select';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {LowerCasePipe} from '@angular/common';
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {ChipsPipe} from '../../../../pipes/chips-pipe';

@Component({
  selector: 'app-relative-time-range',
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatTooltip,
    MatError,
    LowerCasePipe,
    ChipsPipe
  ],
  templateUrl: './relative-time-range.component.html',
  styleUrls: ['./relative-time-range.component.scss', '../../cohort-generation.component.scss']
})
export class RelativeTimeRangeComponent {
  /** The form group containing relative time range controls */
  form = input.required<FormGroup>();

  /** Configuration option defining the relative time range field behavior */
  option = input.required<Option>();

  /** Error message constants for validation */
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG

  /** List of available time period units (days, weeks, months, years) */
  readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;

}
