/**
 * Component for managing weighted distribution inputs across multiple categories.
 * Supports both decimal (0-1) and percentage (0-100) units with automatic redistribution
 * when values change. Allows locking individual weights to prevent redistribution.
 * Provides restore defaults functionality and handles unit conversion between decimal and percent.
 */
import {Component, computed, effect, inject, input, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option, WeightingOption} from '../../../../models/use-case';
import {Subject} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {WeightingHelperService} from '../../../../services/form-helpers/weighting-helper.service';
import {ChipsPipe} from '../../../../pipes/chips-pipe';

@Component({
  selector: 'app-weighting-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckbox,
    MatSliderModule,
    MatButton,
    MatIconModule,
    NgClass,
    MatTooltipModule,
    ChipsPipe,
  ],
  templateUrl: './weighting-form.component.html',
  styleUrls: ['./weighting-form.component.scss', '../../cohort-generation.component.scss']
})
export class WeightingFormComponent implements OnDestroy{

  /** The form group containing the weighting controls */
  form = input.required<FormGroup>();

  /** The original form group for restoring default values */
  originalFrom = input.required<FormGroup>();

  /** The weighting option configuration with default values */
  option = input.required<WeightingOption>();

  /** Whether to display labels as input fields */
  labelsAsInput = input<boolean>(false);

  /** Computed signal that returns the weighting option if control type is 'weighting' */
  weightingOption = computed(() => {
    const opt = this.option();
    return opt.control === 'weighting' ? opt : null;
  });

  /** Service for weighting calculations and helpers */
  private weightingHelperService: WeightingHelperService = inject(WeightingHelperService);

  /** Signal for current units (decimal or percent) from the service */
  units = this.weightingHelperService.units;

  /** Tracks the previous units value to detect changes */
  private previousUnits: 'decimal' | 'percent' | undefined;

  /** Effect that updates all weights when units change between decimal and percent */
  private readonly unitsChangeEffect = effect(() => {
    const currentUnits = this.units();

    // Skip the initial run or if value hasn't changed
    if (this.previousUnits !== undefined && this.previousUnits !== currentUnits) {
      this.updateAllWeightsForUnits(currentUnits);
    }

    this.previousUnits = currentUnits;
  });

  /** Temporary storage for the weight value when input is focused, used for redistribution calculations */
  weighingInputGlobalStorage: number | null = null;

  /** Subject for cleanup on component destruction */
  private destroy$ = new Subject<void>();

  /** Lifecycle hook that cleans up resources and subscriptions */
  ngOnDestroy() {
    this.weighingInputGlobalStorage = null;
    this.unitsChangeEffect.destroy?.();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Restores default values for a specific rule from the original form.
   * Handles both decimal and percent units appropriately.
   * @param ruleId - The identifier of the rule to restore
   */
  onRestoreDefaults(ruleId: string) {
    if (this.units() == 'decimal') { //The original form values are always passed as decimals from the API, therefore restoring the form ot its original state is easy
      this.form().get(ruleId)?.setValue(this.originalFrom().get(ruleId)?.value);
    } else {
      const currentFg = this.form().get(ruleId) as FormGroup;
      if (Object.keys(currentFg.controls).indexOf('slider') != -1) {
        currentFg.controls?.['slider'].setValue(this.originalFrom()?.get([ruleId, 'slider'])?.value, {emitEvent: false});
        currentFg.controls?.['0'].setValue(this.originalFrom()?.get([ruleId, '0'])?.value, {emitEvent: false});
        currentFg.controls?.['1'].setValue(this.originalFrom()?.get([ruleId, '1'])?.value, {emitEvent: false});

      } else {
        Object.keys(currentFg.controls).forEach(key => {
          currentFg.get([key, key])?.setValue(this.originalFrom()?.get([ruleId, key, key])?.value);
          currentFg.get([key, `${key}_lock}`])?.setValue(false);
        });
      }
    }
    this.form().get(ruleId)?.clearValidators();
    this.form().get(ruleId)?.markAsPristine();
  }

  /**
   * Calculates and redistributes weights when a value changes.
   * Only triggers if the current value differs from the stored previous value.
   * @param option - The option being modified
   * @param i - The index of the weight being changed
   */
  calculateWeights(option: Option, i: number) {
    const formGroup = this.form().get(option.ruleId) as FormGroup;
    const previousValue = this.weighingInputGlobalStorage;
    const currentValue = this.form().get([option.ruleId, i, i])!.value;
    if (this.weighingInputGlobalStorage != currentValue) {
      this.setWeights(previousValue || 0, currentValue, i, formGroup)
    }
  }

  /**
   * Toggles the lock state of a weight input, enabling or disabling the field.
   * @param form - The form group containing the weight
   * @param option - The option being toggled
   * @param index - The index of the weight to toggle
   */
  onToggleCheckbox(form: FormGroup, option: any, index: number) {
    const checkBoxFg = form.get([option.ruleId, index, `${index}_lock`])!;
    const input = form.get([option.ruleId, index, `${index}`])!;
    checkBoxFg.patchValue(!checkBoxFg.value, {emitEvent: false});
    if (checkBoxFg.value) {
      input.disable({emitEvent: false});
    } else {
      input.enable({emitEvent: false});
    }
  }

  /**
   * Stores the current weight value when input receives focus.
   * Used to calculate the difference when the value changes.
   * @param value - The current weight value
   */
  onFocus(value: number | null) {
    this.weighingInputGlobalStorage = value;
  }

  /**
   * Handles blur event on weight input, triggering recalculation if value changed.
   * @param option - The option that lost focus
   * @param i - The index of the weight input
   */
  onBlur(option: Option, i: number) {
    const formControl = this.form().get([option.ruleId, i, i]);
    if (formControl?.dirty) {
      this.calculateWeights(option, i);
    }
    this.weighingInputGlobalStorage = null;
  }

  /**
   * Sets weights by redistributing the difference among unlocked weights.
   * Maintains the total sum while respecting locked weights.
   * @param previousValue - The previous weight value before change
   * @param currentValue - The new weight value after change
   * @param currentFormIndex - The index of the weight being changed
   * @param optionGroup - The form group containing all weights
   */
  private setWeights(previousValue: number, currentValue: number, currentFormIndex: number, optionGroup: FormGroup<any>) {
    //We need to get the values of the form fields in InputItem[] format
    const multiplicationFactor = this.units() == 'percent' ? 1 : 100;
    const inputValues = Object.keys(optionGroup.controls).map((key, index) => {
      if (index == currentFormIndex) {
        return {lock: false, value: Math.round(previousValue * multiplicationFactor)};
      } else {
        return {
          lock: optionGroup.controls[key].getRawValue()[`${index}_lock`],
          value: optionGroup.controls[key].getRawValue()[index] * multiplicationFactor
        };
      }
    });

    // Calculate the adjusted values
    const adjustedValues = this.weightingHelperService.getAdjustedWeights(inputValues, currentFormIndex, currentValue * multiplicationFactor).map(el => {
      const rounded = Math.round(el.value * 10) / (this.units() == 'percent' ? 10 : 1000);
      return {lock: el.lock, value: rounded}
    });

    // Assign the adjusted values to the form
    adjustedValues.forEach((el, index) => {
      const innerFg = optionGroup.controls[index] as FormGroup;
      if (index != currentFormIndex) {
        innerFg.controls[index].setValue(el.value, {emitEvent: false});
      }
    });
    this.weighingInputGlobalStorage = currentValue;

  }

  /**
   * Converts a numeric value between unit systems.
   * @param value - The value to convert
   * @param from - The source unit system (decimal or percent)
   * @param to - The target unit system (decimal or percent)
   * @returns The converted value
   * - from 'percent' to 'decimal'  => value / 100  (when 0‑100 → 0‑1)
   * - from 'decimal' to 'percent'  => value * 100  (when 0‑1   → 0‑100)
   */
  private convertValue(value: number, from: 'decimal' | 'percent', to: 'decimal' | 'percent'): number {
    if (from === to) return value;
    if (from === 'percent' && to === 'decimal') {
      // value is 0‑100, produce 0‑1
      return value > 1 ? value / 100 : value;
    }
    // from === 'decimal' && to === 'percent'
    return (value >= 0 && value <= 1) ? value * 100 : value;
  }

  /**
   * Updates all weight values in the form when units change.
   * Converts all numeric inputs and slider values between decimal and percent.
   * @param currentUnits - The new unit system to convert to
   */
  private updateAllWeightsForUnits(currentUnits: 'decimal' | 'percent') {
    const sourceUnits = currentUnits === 'decimal' ? 'percent' : 'decimal';

    Object.keys(this.form().controls).forEach(key => {
      const optionGroup = this.form().get(key) as FormGroup;
      if (!optionGroup || !optionGroup.controls) return;

      Object.entries(optionGroup.controls).forEach(([innerKey, ctrl]) => {
        // Numeric input controls have a numeric key (e.g., "0", "1")
        const index = Number(innerKey);
        if (Number.isInteger(index) && (optionGroup.get([innerKey, innerKey]) as FormControl)) {
          const fc = optionGroup.get([innerKey, innerKey]) as FormControl;
          fc.patchValue(this.convertValue(fc.value, sourceUnits, currentUnits), {emitEvent: false});
        }

        // Slider and min/max controls are identified by their explicit names
        if (innerKey === 'slider' || innerKey === '0' || innerKey === '1') {
          const fc = ctrl as FormControl;
          fc.setValue(this.convertValue(fc.value, sourceUnits, currentUnits), {emitEvent: false});
        }
      });
    });
  }
}
