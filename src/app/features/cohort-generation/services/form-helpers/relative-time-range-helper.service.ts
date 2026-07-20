import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import { RelativeTimeRangeOption} from '../../models/use-case';
import {toDays} from '../../../../shared/functions/time-to-days-conversion.function';
import {TIME_PERIOD_UNIT_LIST} from '../../../../constants/app-constants';

/**
 * Helper service for managing relative time range forms with start/end periods.
 * Handles time ranges with automatic unit conversion and validation.
 */
@Injectable({
  providedIn: 'root'
})
export class RelativeTimeRangeHelperService {
  private fb = inject(FormBuilder);
  readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST

  /** Creates a relative time range FormGroup with start/end value/unit controls and validators. */
  buildFg(option?: RelativeTimeRangeOption) {
    return new FormGroup({
      'start': this.fb.group({
        'value': new FormControl(option ? this.getValuesFromDefault(option, 'start', 'value') : null),
        'unit': new FormControl(option ? this.getValuesFromDefault(option, 'start', 'unit') : null),
      }),
      'end': this.fb.group({
        'value': new FormControl(option ? this.getValuesFromDefault(option, 'end', 'value') : null),
        'unit': new FormControl(option ? this.getValuesFromDefault(option, 'end', 'unit') : null),
      })
    }, { validators: [this.startBeforeEndValidator, this.valueGreaterThanZeroValidator] });
  }

  /** Validates that start time is before or equal to end time (converted to days for comparison). */
  startBeforeEndValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('start')?.value;
    const end = control.get('end')?.value;
    if(!start.value || !end.value ){
      return null;
    }
    const startDaysCount = toDays(start.unit, start.value);
    const endDaysCount = toDays(end.unit, end.value);
    if (endDaysCount < startDaysCount) {
      return  { startBeforeEnd: true }
    }
    else {
      return null
    }
  }

  /** Validates that start and end values are non-negative. */
  valueGreaterThanZeroValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('start')?.value;
    const end = control.get('end')?.value;

    // Check if start value exists and is less than or equal to 0
    if (start?.value !== null && start?.value !== undefined && start?.value !== '' && start.value < 0) {
      return { valueNotPositive: true };
    }

    // Check if end value exists and is less than or equal to 0
    if (end?.value !== null && end?.value !== undefined && end?.value !== '' && end.value < 0) {
      return { valueNotPositive: true };
    }

    return null;
  }

  /** Converts default day values to appropriate units (days/weeks/months/years) based on magnitude. */
  private getValuesFromDefault(option: RelativeTimeRangeOption, fgName: string, fcName: string) {
    const startValue = option.defaultValues.start;
    const endValue = option.defaultValues.end;
    const defaultValue = fgName === 'start' ? startValue : endValue;

    // If the default value is zero, return empty string for value and first unit for unit
    if (defaultValue === 0) {
      return fcName === 'value' ? '' : this.TIME_PERIOD_UNIT_LIST[0].value;
    }

    // Determine appropriate unit and divisor based on thresholds
    if (defaultValue < 7) {
      // Days
      return fcName === 'value' ? defaultValue : this.TIME_PERIOD_UNIT_LIST[0].value;
    } else if (defaultValue < 30) {
      // Weeks (7 days per week)
      return fcName === 'value' ? defaultValue / 7 : this.TIME_PERIOD_UNIT_LIST[1].value;
    } else if (defaultValue < 365) {
      // Months (30 days per month)
      return fcName === 'value' ? defaultValue / 30 : this.TIME_PERIOD_UNIT_LIST[2].value;
    } else {
      // Years (365 days per year)
      return fcName === 'value' ? defaultValue / 365 : this.TIME_PERIOD_UNIT_LIST[3].value;
    }
  }

}
