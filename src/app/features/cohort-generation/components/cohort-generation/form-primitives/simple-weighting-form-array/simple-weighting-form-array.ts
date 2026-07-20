/**
 * Component for managing a dynamic weighting form array with lock/unlock functionality.
 * Provides automatic weight redistribution when values change, respecting locked items.
 * Supports both percentage (0-100) and decimal (0-1) units.
 */
import {Component, inject, input, OnDestroy} from '@angular/core';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {WeightingHelperService} from '../../../../services/form-helpers/weighting-helper.service';


@Component({
  selector: 'app-simple-weighting-form-array',
  imports: [
    MatIcon,
    MatTooltip,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatCheckbox,
    MatSuffix,
    MatError,
  ],
  templateUrl: './simple-weighting-form-array.html',
  styleUrl: './simple-weighting-form-array.scss',
})
export class SimpleWeightingFormArray implements OnDestroy {
  /** The form array containing weighted items */
  formArray = input<FormArray<FormGroup>>(new FormArray<FormGroup>([]));

  /** The unit system for weights: 'decimal' (0-1) or 'percent' (0-100) */
  units = input<'decimal' | 'percent'>('percent');

  /** Service for weighting calculations and adjustments */
  private weightingHelperService: WeightingHelperService = inject(WeightingHelperService);

  /** Temporary storage for the original weight value when an input is focused */
  private weighingInputGlobalStorage: number | null = null;

  /** Toggles the lock state of a form group's checkbox */
  onToggleCheckbox(fg: FormGroup) {
    const currentLockState = fg.get(['lock'])?.value;
    fg.get(['lock'])?.patchValue(!currentLockState);
  }

  /** Stores the current weight value when an input receives focus */
  onFocus(index: number) {
    const fg = this.formArray().get([index]) as FormGroup;
    this.weighingInputGlobalStorage = fg.get(['weight'])?.value;
  }

  /** Handles blur event, resetting invalid values or recalculating weights */
  onBlur(index: number) {
    const fg = this.formArray().get([index]) as FormGroup;
    const weightControl = fg.get(['weight']);

    // If control is invalid on blur, reset to the stored value
    if (weightControl?.invalid && this.weighingInputGlobalStorage !== null) {
      weightControl.setValue(this.weighingInputGlobalStorage, {emitEvent: false});
    } else {
      this.calculateWeights(index);
    }

    this.weighingInputGlobalStorage = null;
  }

  /** Recalculates and redistributes weights across unlocked items when a value changes */
  calculateWeights(index: number) {
    this.formArray().updateValueAndValidity();
    const fg = this.formArray().get([index]) as FormGroup;

    const weightControl = fg.get(['weight']);
    let newValue = Number(fg.get(['weight'])!.value);

    // If NaN (invalid string input), treat as 0
    if (isNaN(newValue)) {
      newValue = 0;
      weightControl?.setValue(0, {emitEvent: false});
    }

    // If the control is still invalid after NaN handling, don't proceed
    if (weightControl?.invalid) {
      return;
    }

    // If no stored value (e.g., direct typing without focus), use current value as previous
    const previousValue = this.weighingInputGlobalStorage ?? newValue;

    // If previous and new are the same, no calculation needed
    if (previousValue === newValue) {
      this.weighingInputGlobalStorage = null;
      return;
    }

    const multiplicationFactor = this.units() == 'percent' ? 1 : 100;
    const inputValues = this.formArray().controls.map((control, i) => {
      if (i == index) {
        return {lock: false, value: Math.round(previousValue * multiplicationFactor)};
      } else {
        return {
          lock: control.controls['lock'].getRawValue(),
          value: control.controls['weight'].getRawValue() * multiplicationFactor
        };
      }
    })

    const result = this.weightingHelperService.getAdjustedWeights(inputValues, index, newValue);
    this.formArray().controls.forEach((control, i) => {
      if (!control.controls['lock'].getRawValue()) {
        // Round to 1 decimal place to match medication weights behavior
        const roundedValue = Math.round(result[i].value * 10) / 10;
        control.controls['weight'].setValue(roundedValue, {emitEvent: false});
      }
    });

    // Clear the storage to prevent recalculation on blur
    this.weighingInputGlobalStorage = null;
  }

  /** Deletes an item from the array and redistributes weights */
  onDelete(index: number) {
    if(this.formArray().length == 3) {
      // Unlock all elements when there are 3 items
      this.formArray().controls.forEach(control => {
        control.get('lock')?.setValue(false, {emitEvent: false});
      });
    }
    const fg = this.formArray().get([index]) as FormGroup;
    fg.get(['lock'])?.setValue(false);
    this.weighingInputGlobalStorage = fg.get(['weight'])?.getRawValue();
    fg.get(['weight'])?.setValue(0);
    fg.markAsDirty();
    this.calculateWeights(index);
    this.formArray().controls.splice(index, 1);
    //If there is one element ion the array its value mus always be 100/1
    if(this.formArray().length == 1) {
      this.formArray().get([0, 'weight'])?.setValue(this.units() == 'percent' ? 100 : 1, {emitEvent: false});
      this.formArray().get([0, 'value']).enable({emitEvent: false});
    }
    else if(this.formArray().length == 2) {
      this.formArray().enable({emitEvent: false});
    }

  }

  /** Cleanup method to clear stored weight value on component destruction */
  ngOnDestroy() {
    this.weighingInputGlobalStorage = null;
  }
}
