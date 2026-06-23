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
import {MatChip} from '@angular/material/chips';
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
  form = input.required<FormGroup>();
  option = input.required<Option>();
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG
  readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;

}
