import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TIME_PERIOD_UNIT_LIST } from '../../../../constants/app-constants';

/**
 * Helper service for managing event set timing forms with onset and repeat patterns.
 * Handles time-based event scheduling with "onset plus", "repeat every", and "until" controls.
 */
@Injectable({
  providedIn: 'root'
})
export class OnsetTimeRangeHelperService {
  private fb = inject(FormBuilder);
  readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;

  /** Creates event set timing FormGroup with onset, repeat, and until controls. */
  buildEventSetTimingFg(importedValue?: any) {
    // 1. Create form with default disabled state
    let fg = new FormGroup({
      onsetPlusFg: this.fb.group({
        value: new FormControl(0),
        unit: new FormControl(this.TIME_PERIOD_UNIT_LIST[0].value),
      }),
      repeatFg: this.fb.group({
        repeat: new FormControl(false),
        every: this.fb.group({
          value: new FormControl({ value: 0, disabled: true }),
          unit: new FormControl({ value: this.TIME_PERIOD_UNIT_LIST[2].value, disabled: true }),
        })
      }),
      untilFg: this.fb.group({
        endFor: new FormControl({ value: 'End', disabled: true }),
        value: new FormControl({ value: 0, disabled: true }),
        unit: new FormControl({ value: this.TIME_PERIOD_UNIT_LIST[0].value, disabled: true }),
      })
    });

    // 2. If importing, set values and adjust enabled/disabled state
    if (importedValue) {
      fg.patchValue(importedValue, { emitEvent: false });
      this.syncFormState(fg);
    }

    // 3. Set up subscriptions for future changes
    this.subscribeToValueChange(fg);

    return fg;
  }

  /** Synchronizes form control enabled/disabled states based on imported values. */
  private syncFormState(fg: FormGroup) {
    const isRepeatEnabled = fg.get(['repeatFg', 'repeat'])?.value === true;
    const isForSelected = fg.get(['untilFg', 'endFor'])?.value === 'For';

    if (isRepeatEnabled) {
      fg.get(['repeatFg', 'every', 'value'])?.enable({ emitEvent: false });
      fg.get(['repeatFg', 'every', 'unit'])?.enable({ emitEvent: false });
      fg.get(['untilFg', 'endFor'])?.enable({ emitEvent: false });

      if (isForSelected) {
        fg.get(['untilFg', 'value'])?.enable({ emitEvent: false });
        fg.get(['untilFg', 'unit'])?.enable({ emitEvent: false });
      }
    }
  }

  /**
   * Sets up subscriptions to manage control states when repeat/until values change.
   *
   * Repeat checkbox behavior:
   * - When enabled: Activates "every" controls and "End/For" selector
   * - When disabled: Resets and disables all repeat and until controls
   *
   * End/For selector behavior:
   * - "End": Disables until value/unit controls
   * - "For": Enables until value/unit controls for duration specification
   */
  private subscribeToValueChange(fg: FormGroup) {
    const repeatValueCtrl = fg.get(['repeatFg', 'repeat']);
    const everyValueCtrl = fg.get(['repeatFg', 'every', 'value']);
    const everyUnitCtrl  = fg.get(['repeatFg', 'every', 'unit']);
    const untilEndForCtrl = fg.get(['untilFg', 'endFor']);
    const untilValueCtrl = fg.get(['untilFg', 'value']);
    const untilUnitCtrl = fg.get(['untilFg', 'unit']);

    // Subscribe to repeat checkbox changes
    repeatValueCtrl.valueChanges.subscribe((value) => {
      if (value === true) {
        // Enable repeat controls when repeat is checked
        everyValueCtrl?.enable({ emitEvent: false });
        everyUnitCtrl?.enable({ emitEvent: false });
        untilEndForCtrl?.enable({ emitEvent: false });
        // Until value/unit remain disabled until "For" is selected
        untilValueCtrl?.disable({ emitEvent: false });
        untilUnitCtrl?.disable({ emitEvent: false });
      } else {
        // Reset and disable all repeat-related controls when unchecked
        everyValueCtrl?.setValue(0, { emitEvent: false });
        everyUnitCtrl?.setValue(this.TIME_PERIOD_UNIT_LIST[0].value, { emitEvent: false });
        everyValueCtrl?.disable({ emitEvent: false });
        everyUnitCtrl?.disable({ emitEvent: false });

        // Reset until controls to default state
        untilEndForCtrl?.setValue('End', { emitEvent: false });
        untilValueCtrl?.setValue(0, { emitEvent: false });
        untilUnitCtrl?.setValue(this.TIME_PERIOD_UNIT_LIST[0].value, { emitEvent: false });
        untilEndForCtrl?.disable({ emitEvent: false });
        untilValueCtrl?.disable({ emitEvent: false });
        untilUnitCtrl?.disable({ emitEvent: false });
      }
    });

    // Subscribe to End/For selector changes
    untilEndForCtrl.valueChanges.subscribe((value) => {
      if(value.toLowerCase() == 'end'){
        // "End" selected: Reset and disable duration controls
        untilValueCtrl?.setValue(0, { emitEvent: false });
        untilUnitCtrl?.setValue(this.TIME_PERIOD_UNIT_LIST[0].value, { emitEvent: false });
        untilValueCtrl?.disable({ emitEvent: false });
        untilUnitCtrl?.disable({ emitEvent: false });
      }
      else{
        // "For" selected: Enable duration controls
        untilValueCtrl?.enable({ emitEvent: false });
        untilUnitCtrl?.enable({ emitEvent: false });
      }
    })


  }
}
