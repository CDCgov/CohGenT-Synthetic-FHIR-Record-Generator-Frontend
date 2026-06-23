import { inject, Injectable, signal } from '@angular/core';
import { WeightingOption} from '../../models/use-case';
import { CategoryTuple } from '../../models/use-case';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class WeightingHelperService {
  private fb = inject(FormBuilder);
  private isUpdating: boolean = false;
  private _units = signal<'decimal' | 'percent'>('percent');
  public readonly units = this._units.asReadonly();

  public setUnits(units: 'decimal' | 'percent') {
    this._units.set(units);
  }

  /** Build a FormGroup for a given weighting option */
  buildFg(option: WeightingOption): FormGroup {
    const fg = this.fb.group({});
    const values = option.defaultValues.values;
    const multiplicator = this.units() == 'percent' ? 100 : 1;

    // Handle 2 values case
    if (values.length === 2) {
      const firstValue = values[0];
      const secondValue = values[1];

      fg.addControl('slider', new FormControl(firstValue.weight * multiplicator));
      fg.addControl('0', new FormControl(firstValue.weight * multiplicator, [
        Validators.required,
        Validators.min(0),
        Validators.max(this._units() === 'percent' ? 100 : 1)
      ]));
      fg.addControl('1', new FormControl(secondValue.weight, [
        Validators.required,
        Validators.min(0),
        Validators.max(this._units() === 'percent' ? 100 : 1)
      ]));
      this.setWeightingValueChangeSubscriptions(fg);
      return fg;
    }

    // Handle multiple values case
    values.forEach((categoryTuple: CategoryTuple, index: number) => {
      const innerFg = new FormGroup({});
      const multiplicator = this.units() == 'percent' ? 100 : 1;
      innerFg.addControl(`${index}`, new FormControl(categoryTuple.weight * multiplicator, [
        Validators.required,
        Validators.min(0),
        Validators.max(this._units() === 'percent' ? 100 : 1)
      ]));
      innerFg.addControl(`${index}_lock`, new FormControl(false));
      fg.addControl(`${index}`, innerFg);
    });

    return fg;
  }

  /**
   adjustProportionally follows the following algorithm documented on our wiki page:
   https://wiki.gtri.gatech.edu/pages/viewpage.action?pageId=555849728&spaceKey=CDCTTS&title=Weighting%2BDistribution%2BFormula

   on change of value for field n
   change of n = previous value of n - new value of n
   sum = sum of all other fields not n
   for each other field m
   relative distribution = current value of m / sum
   change to make to m = change of n x(times) relative distribution
   new value of m = current value of m + change to make to m

   Note that the algorithm above does not account for edge cases
   */
  getAdjustedWeights(
    oldInputs: WeightingInputItem[],
    indexToChange: number,
    newValue: number
  ): WeightingInputItem[] {
    const numInputs = oldInputs.length;

    // Basic Input Validation ---
    if (indexToChange < 0 || indexToChange >= numInputs) {
      console.error('Error: Index to change is out of bounds.');
      return [...oldInputs];
    }

    // If any of the element is set to 100, we assume that the user wants set all other elements to 0 and unlock them
    if (newValue == 100 && !oldInputs.find(el => !el.lock)) {
      const result = oldInputs.map((el, index) => {
        if (index == indexToChange) {
          return {lock: el.lock, value: 100};
        } else {
          return {lock: false, value: 0};
        }
      });
      return result;
    }

    // ---- locked fields ------------------------------------------------
    const sumLocked = oldInputs.reduce((sum, input) => input.lock ? sum + input.value : sum, 0);
    if (sumLocked > 100) {
      console.error('The sum of the locked fields cannot exceed 100%');
      return oldInputs.map((el, i) => ({
        lock: el.lock,
        value: i === indexToChange ? newValue : el.value
      }));
    }

    // If locked + new value already reach 100%, set all other unlocked to 0
    // This is a common case of the user wants to set unlocked fields to 0
    if (sumLocked + newValue === 100) {
      return oldInputs.map((el, i) => ({
        lock: el.lock,
        value: i === indexToChange ? newValue : el.lock ? el.value : 0
      }));
    }

    // ---- adjustable (unlocked) fields --------------------------------
    const sumOldAdjustable = oldInputs.reduce((sum, input, i) =>
      !input.lock && i !== indexToChange ? sum + input.value : sum, 0);

    const remainingToDistribute = 100 - newValue - sumLocked;
    const changeOfN = oldInputs[indexToChange].value - newValue;

    const newInputs = oldInputs.map((oldInput, i) => {
      // Case A: The user-defined value
      if (i === indexToChange) {
        return { lock: oldInput.lock, value: newValue };
      }
      // Case B: Locked value (retains its original value)
      if (oldInput.lock) {
        return { lock: true, value: oldInput.value };
      }

      // Adjustable input
      let adjustedValue: number;
      if (sumOldAdjustable === 0) {
        // Edge case: All original adjustable values were 0.
        // Distribute remainder equally among all currently adjustable inputs.
        // If `adjustableCount` is already calculated, use the pre-calculated value.
        const adjustableCount = oldInputs.filter((_v, idx) => !oldInputs[idx].lock && idx !== indexToChange).length;
        adjustedValue = adjustableCount ? remainingToDistribute / adjustableCount : 0;
      } else {
        const relativeDistribution = oldInput.value / sumOldAdjustable;
        const changeToMake = changeOfN * relativeDistribution;
        adjustedValue = oldInput.value + changeToMake;
      }
      // Ensure weight is never negative
      adjustedValue = Math.max(0, adjustedValue);
      return { lock: false, value: this.roundToDecimalPlaces(adjustedValue, 2) };
    });

    // 1. Calculate the current sum (total) of all the newly-computed weight values in newInputs.
    const total = newInputs.reduce((s, it) => s + it.value, 0);

    // 2. Determine the discrepancy (diff) between the ideal total (100%) and the actual sum, rounding the difference to two decimal places.
    const diff = Math.round((100 - total) * 100) / 100; // two-decimal precision

    // 3. If the discrepancy is significant (greater than 0.0001), locate the first *adjustable* (unlocked) input that is not the one the user just edited (indexToChange).
    if (Math.abs(diff) > 0.0001) {
      // 4. Adjust that input by adding the entire diff to its value, then round the result to two decimal places. This ensures the overall total becomes exactly 100% after the correction.
      const adjustIdx = newInputs.findIndex((_v, i) => !oldInputs[i].lock && i !== indexToChange);
      if (adjustIdx !== -1) {
        const correctedValue = newInputs[adjustIdx].value + diff;
        // Ensure weight is never negative
        newInputs[adjustIdx] = {
          lock: false,
          value: this.roundToDecimalPlaces(Math.max(0, correctedValue), 2)
        };
      }
    }

    return newInputs;
  }

  /* -------------------------------------------------------------
   * Subscription handling for the slider / input pair
   * ------------------------------------------------------------- */
  private setWeightingValueChangeSubscriptions(optionGroup: FormGroup) {
    if (!optionGroup) return;

    const input0Control = optionGroup.get('0');
    const input1Control = optionGroup.get('1');
    const sliderControl = optionGroup.get('slider');

    sliderControl?.valueChanges
      .subscribe(sliderValue => {
        if (this.isUpdating) return;
        this.isUpdating = true;

        input0Control?.setValue(sliderValue, { emitEvent: false });
        const complementary = this.calculateCorrespondingValue(sliderValue);
        if (complementary != null) {
          input1Control?.setValue(complementary, { emitEvent: false });
        }

        this.isUpdating = false;
      });

    input0Control?.valueChanges
      .subscribe(input0Value => {
        if (this.isUpdating) return;
        this.isUpdating = true;

        // Update slider with input0 value
        sliderControl?.setValue(input0Value, {emitEvent: false});

        // Update input1 based on your business logic
        const complementaryValue = this.calculateCorrespondingValue(input0Value);
        if(complementaryValue != null){
          input1Control?.setValue(complementaryValue, {emitEvent: false});
        }

        this.isUpdating = false;
      });

    input1Control?.valueChanges
      .subscribe(input1Value => {
        if (this.isUpdating) return;
        this.isUpdating = true;

        const corresponding = this.calculateCorrespondingValue(input1Value);
        input0Control?.setValue(corresponding, { emitEvent: false });
        sliderControl?.setValue(corresponding, { emitEvent: false });

        this.isUpdating = false;
      });
  }

  /** Convert a value from one input to its counterpart */
  private calculateCorrespondingValue(inputValue: number): number | null {
    if (inputValue < 0) {
      return null;
    }
    if (inputValue <= 1) {
      const result = (this._units() === 'percent' ? 100 : 1) - inputValue;
      return this.roundToDecimalPlaces(result, 2);
    }
    return 100 - inputValue;
  }

  /** Utility – round to a fixed number of decimal places */
  private roundToDecimalPlaces(num: number, decimalPlaces = 2): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }
}
