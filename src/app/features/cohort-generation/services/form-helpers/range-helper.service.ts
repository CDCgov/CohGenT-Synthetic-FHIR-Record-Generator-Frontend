import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {RangeOption} from '../../models/use-case';

/**
 * Helper service for managing numeric range forms with dual slider/input controls.
 * Handles min/max ranges with bidirectional synchronization and validation.
 */
@Injectable({
  providedIn: 'root'
})
export class RangeHelperService {
  private isFieldUpdating: boolean;
  private fb = inject(FormBuilder);

  /** Creates a range FormGroup with synchronized slider and input controls for min/max values. */
  getRangeFg(option: RangeOption): FormGroup {
    const [minValue, maxValue] = option.defaultValues;
    const [minBound, maxBound] = option.minMax;

    const fg = this.fb.group({
      'slider-min': new FormControl(minValue),
      'slider-max': new FormControl(maxValue),
      'min': new FormControl(minValue, [
        Validators.required,
        Validators.min(minBound),
        Validators.max(maxBound)
      ]),
      'max': new FormControl(maxValue, [
        Validators.required,
        Validators.min(minBound),
        Validators.max(maxBound)
      ]),
    }, { validators: this.minSmallerThanMax });

    this.setValueChangeSubscriptions(fg);
    return fg;
  }
  /** Sets up bidirectional synchronization between sliders and inputs, preventing infinite loops. */
  private setValueChangeSubscriptions(fg: FormGroup) {
    if (!fg) return;
    const minControl = fg.get('min');
    const maxControl = fg.get('max');
    const sliderMin = fg.get('slider-min');
    const sliderMax = fg.get('slider-max');

    sliderMin?.valueChanges
      .pipe(
        // takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (this.isFieldUpdating) return;

        this.isFieldUpdating = true;

        minControl?.setValue(value, {emitEvent: false});

        this.isFieldUpdating = false;
      });

    sliderMax?.valueChanges
      .pipe(
        // takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (this.isFieldUpdating) return;

        this.isFieldUpdating = true;

        maxControl?.setValue(value, {emitEvent: false});

        this.isFieldUpdating = false;
      });

    minControl?.valueChanges
      .pipe(
        // takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (this.isFieldUpdating) return;

        this.isFieldUpdating = true;

        sliderMin?.setValue(value, {emitEvent: false});

        this.isFieldUpdating = false;
      });

    maxControl?.valueChanges
      .subscribe(value => {
        if (this.isFieldUpdating) return;

        this.isFieldUpdating = true;

        sliderMax?.setValue(value, {emitEvent: false});

        this.isFieldUpdating = false;
      });

  }


  /** Validates that min value is less than or equal to max value. */
  private minSmallerThanMax(control: AbstractControl): ValidationErrors | null {
    const min = control.get('min')?.value;
    const max = control.get('max')?.value;

    return min != null && max != null && min <= max ? null : { minNotSmallerThanMax: true };
  }
}
