import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ConceptHelperService} from './concept-helper.service';
import {SYSTEM_LIST} from '../../../../constants/app-constants';
import {WeightingHelperService} from './weighting-helper.service';

/**
 * Helper service for managing medication sets with weighted distributions.
 * Handles medication CRUD operations, weight calculations, and validation.
 */
@Injectable({
  providedIn: 'root'
})
export class MedicationHelperService {
  private fb = inject(FormBuilder);
  private conceptHelperService = inject(ConceptHelperService);
  private weightingHelper = inject(WeightingHelperService);
  private isUpdating = false;
  private focusedWeightValue: number | null = null;
  readonly DEFAULT_SYSTEM = SYSTEM_LIST.find(system => system.label === "RxNorm");

  /** Adds a new medication to the medications array. */
  addMedication(fgArray: FormArray) {
    fgArray.push(this.fb.group({
        dosage: new FormControl(''),
        concept: this.conceptHelperService.buildFg(this.DEFAULT_SYSTEM),
        deleteOnCancel: new FormControl(true)
      }
    ));
  }

  /** Removes a medication at the specified index. */
  deleteMedication(i: number, medicationFromArray: FormArray) {
    medicationFromArray.removeAt(i);
  }

  private importMedications(fgArray: FormArray, importData: any[]) {
    importData.forEach((item) => {
      let medicationFg = new FormGroup({
        concept: this.conceptHelperService.buildFg(),
        dosage: new FormControl(),
      });
      medicationFg.patchValue(item);
      fgArray.push(medicationFg);
    })
  }

  /** Imports medication sets from saved/exported data with weights. */
  importMedicationSets(medicationSetsFormArray: FormArray, importData: any[]): void {
    // Clear existing medication sets
    medicationSetsFormArray.clear();

    importData.forEach((setData) => {
      // Use the imported nameCounter directly
      const nameCounter = setData.nameCounter;
      const medicationSetFg = this.buildMedicationSetFg(nameCounter);

      // Import medications into this set
      const medicationsArray = medicationSetFg.get('medications') as FormArray;
      medicationsArray.clear(); // Remove default empty medication

      if (setData.medications && Array.isArray(setData.medications)) {
        this.importMedications(medicationsArray, setData.medications);
      }

      // Patch the medication set values - both always false for imports
      medicationSetFg.patchValue({
        deleteOnCancel: false,  // Always false for imported sets
        isInEditMode: false     // Always false for imported sets
      }, { emitEvent: false });

      // Patch weightFg separately
      if (setData.weightFg) {
        medicationSetFg.get('weightFg')?.patchValue({
          weight: setData.weightFg.weight ?? 0,
          lock: setData.weightFg.lock ?? false
        }, { emitEvent: false });
      }

      medicationSetsFormArray.push(medicationSetFg);
    });

    // Update weight control states after import
    this.updateWeightControlStates(medicationSetsFormArray);
  }

  /** Adds a new medication set with initial weight distribution. */
  addMedicationSet(medicationSetsFormArray: FormArray) {
    const nextNameCounter = this.getNextNameCounter(medicationSetsFormArray);
    const medicationSetFg = this.buildMedicationSetFg(nextNameCounter);
    this.addMedication(medicationSetFg.get('medications') as FormArray);

    medicationSetsFormArray.push(medicationSetFg);

    // Initialize weights: first set gets 100%, others get 0%
    this.initWeights(medicationSetsFormArray);

    // Update weight control states based on array length
    this.updateWeightControlStates(medicationSetsFormArray);
  }

  /** Copies an existing medication set and adds it to the end of the array. */
  copyMedicationSet(medicationSetsFormArray: FormArray, sourceIndex: number): void {
    // Validate index
    if (sourceIndex < 0 || sourceIndex >= medicationSetsFormArray.length) {
      console.error('Invalid source index for copying medication set');
      return;
    }

    // Get the source medication set
    const sourceMedicationSet = medicationSetsFormArray.at(sourceIndex);

    // Get the next available nameCounter
    const nextNameCounter = this.getNextNameCounter(medicationSetsFormArray);

    // Create a new medication set FormGroup with the next nameCounter
    const copiedMedicationSetFg = this.buildMedicationSetFg(nextNameCounter);

    // Copy medications from source
    const sourceMedications = sourceMedicationSet.get('medications') as FormArray;
    const copiedMedications = copiedMedicationSetFg.get('medications') as FormArray;

    // Clear the default empty medication that buildMedicationSetFg creates
    copiedMedications.clear();

    // Deep copy each medication
    sourceMedications.controls.forEach((medicationControl) => {
      const medicationValue = medicationControl.value;

      // Build new medication FormGroup
      const newMedicationFg = this.fb.group({
        dosage: new FormControl(medicationValue.dosage || ''),
        concept: this.conceptHelperService.buildFg(this.DEFAULT_SYSTEM),
        deleteOnCancel: new FormControl(false) // Existing medication
      });

      // Patch the concept data
      if (medicationValue.concept) {
        newMedicationFg.get('concept')?.patchValue(medicationValue.concept);
      }

      copiedMedications.push(newMedicationFg);
    });

    // Set control states for the copied set
    copiedMedicationSetFg.patchValue({
      deleteOnCancel: false, // It's a copy of existing data
      isInEditMode: false    // Display in view mode (not edit mode)
    }, { emitEvent: false });

    // Separately patch the weightFg
    copiedMedicationSetFg.get('weightFg')?.patchValue({
      weight: 0,
      lock: false
    }, { emitEvent: false });

    // Add the copied set at the end of the array
    medicationSetsFormArray.push(copiedMedicationSetFg);

    // If we went from 1 to 2 sets, enable the weight control on the first set
    // (it was disabled when there was only one set)
    if (medicationSetsFormArray.length === 2) {
      const firstSetWeightControl = medicationSetsFormArray.at(0).get(['weightFg', 'weight']);
      firstSetWeightControl?.enable({ emitEvent: false });
    }
  }

  private buildMedicationFgArray(){
    return new FormArray([]);
  };

  private buildWeightFg(): FormGroup {
    return this.fb.group({
      weight: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      lock: new FormControl(false)
    });
  }

  /** Validates that medication set weights sum to 100 (within tolerance). */
  static weightSumValidator(tolerance: number = 0.1): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }

      // Skip validation if array is empty or has only one item
      // (single item is always 100% by design)
      if (formArray.length <= 1) {
        return null;
      }

      // Calculate sum of all weights
      const sum = formArray.controls.reduce((total, control) => {
        const weight = control.get(['weightFg', 'weight'])?.value ?? 0;
        return total + weight;
      }, 0);

      // Check if sum is approximately 100 within tolerance
      const isValid = Math.abs(sum - 100) <= tolerance;

      return isValid ? null : {
        weightSumInvalid: {
          actualSum: sum,
          expectedSum: 100,
          tolerance: tolerance,
          difference: Math.abs(sum - 100)
        }
      };
    };
  }

  /** Manually validates weight sum and sets errors on the FormArray. */
  validateWeightSum(medicationSetsFormArray: FormArray): void {
    const validator = MedicationHelperService.weightSumValidator();
    const errors = validator(medicationSetsFormArray);

    if (errors) {
      medicationSetsFormArray.setErrors(errors);
    } else {
      // Clear the weightSumInvalid error if it exists
      const currentErrors = medicationSetsFormArray.errors;
      if (currentErrors && currentErrors['weightSumInvalid']) {
        delete currentErrors['weightSumInvalid'];
        const remainingErrors = Object.keys(currentErrors).length > 0 ? currentErrors : null;
        medicationSetsFormArray.setErrors(remainingErrors);
      }
    }
  }

  /** Gets the next available nameCounter for new medication sets. */
  private getNextNameCounter(medicationSetsFormArray: FormArray): number {
    if (medicationSetsFormArray.length === 0) {
      return 1;
    }

    const maxCounter = medicationSetsFormArray.controls.reduce((max, control) => {
      const counter = control.get('nameCounter')?.value ?? 0;
      return Math.max(max, counter);
    }, 0);

    return maxCounter + 1;
  }

  private buildMedicationSetFg(nameCounter: number = 1) {
    const medicationFgArray = this.buildMedicationFgArray();
    const fg =  this.fb.group({
        medications: medicationFgArray,
        deleteOnCancel: new FormControl(true),
        isInEditMode: new FormControl(true),
        weightFg: this.buildWeightFg(),
        nameCounter: new FormControl(nameCounter), //TODO rename in the future. We should consider using a better event set name, for now we use the generic Event Set [n]
      },
    //  { validators: this.eventSetContentValidator() }
    );
    return fg;
  }

  /** Stores the current weight value when input receives focus. */
  onFocus(formArray: FormArray, index: number): void {
    const weightControl = formArray.at(index).get(['weightFg', 'weight']);
    this.focusedWeightValue = weightControl?.value ?? 0;
  }

  /** Triggers weight redistribution when input loses focus. */
  onBlur(formArray: FormArray, index: number): void {
    const weightControl = formArray.at(index).get(['weightFg', 'weight']);

    // If control is invalid on blur, reset to the stored value
    if (weightControl?.invalid && this.focusedWeightValue !== null) {
      weightControl.setValue(this.focusedWeightValue, {emitEvent: false});
    } else {
      this.calculateWeights(formArray, index);
    }

    this.focusedWeightValue = null;
  }

  /** Calculates and redistributes weights proportionally using WeightingHelperService. */
  private calculateWeights(formArray: FormArray, changedIndex: number): void {
    if (this.isUpdating) return;

    this.isUpdating = true;

    const weightControl = formArray.at(changedIndex).get(['weightFg', 'weight']);
    const newValue = weightControl?.value;

    // Parse the input value
    let parsedValue = parseFloat(String(newValue));

    // If the value is NaN (invalid string input), treat as 0
    if (isNaN(parsedValue)) {
      parsedValue = 0;
      weightControl?.setValue(0, { emitEvent: false });
    }

    // Sanitize input: ensure it's a valid number between 0-100
    let sanitizedValue = Math.max(0, Math.min(100, parsedValue));

    // If the sanitized value differs from input, update the control
    if (sanitizedValue !== newValue && sanitizedValue !== parsedValue) {
      weightControl?.setValue(sanitizedValue, { emitEvent: false });
    }

    // If the control is still invalid after sanitization, don't proceed with calculation
    if (weightControl?.invalid) {
      this.isUpdating = false;
      return;
    }

    // If no stored value (e.g., direct typing without focus), use current sanitized value as previous
    const previousValue = this.focusedWeightValue ?? sanitizedValue;

    // If previous and new are the same, no calculation needed
    if (previousValue === sanitizedValue) {
      this.focusedWeightValue = null;
      this.isUpdating = false;
      return;
    }

    // Build WeightingInputItem array using PREVIOUS value (focusedWeightValue) for changed index
    const inputValues = formArray.controls.map((control, i) => {
      const weightFg = control.get('weightFg');
      const lock = weightFg?.get('lock')?.value ?? false;

      if (i === changedIndex) {
        // Use the value that was stored when the input received focus
        return { lock: false, value: this.focusedWeightValue ?? 0 };
      } else {
        // Use current value for other indices
        const value = weightFg?.get('weight')?.value;
        return {
          lock: lock,
          value: (value === null || value === undefined || value === '') ? 0 : value
        };
      }
    });

    // Get adjusted weights using the proportional distribution algorithm
    const adjustedWeights = this.weightingHelper.getAdjustedWeights(
      inputValues,
      changedIndex,
      sanitizedValue
    );

    // Apply adjusted weights back to form controls
    adjustedWeights.forEach((item, index) => {
      const weightControl = formArray.at(index).get(['weightFg', 'weight']);
      const lockControl = formArray.at(index).get(['weightFg', 'lock']);

      // Round to 1 decimal place to match simple-weights and weighting-form behavior
      const roundedValue = Math.round(item.value * 10) / 10;
      weightControl?.setValue(roundedValue, { emitEvent: false });

      // Handle lock state changes from getAdjustedWeights
      if (lockControl && item.lock !== lockControl.value) {
        lockControl.setValue(item.lock, { emitEvent: false });
        if (item.lock) {
          weightControl?.disable({ emitEvent: false });
        } else {
          weightControl?.enable({ emitEvent: false });
        }
      }
    });

    // Clear the focused value to prevent recalculation on blur
    this.focusedWeightValue = null;
    this.isUpdating = false;
  }

  /** Initializes weight for newly added medication set (first=100%, others=0%). */
  private initWeights(formArray: FormArray): void {
    this.isUpdating = true;

    const count = formArray.length;
    if (count === 0) {
      this.isUpdating = false;
      return;
    }

    // Only set the weight for the last (newly added) control
    const lastIndex = count - 1;
    const lastControl = formArray.at(lastIndex);
    const weight = lastIndex === 0 ? 100 : 0;
    lastControl.get(['weightFg', 'weight'])?.setValue(weight, { emitEvent: false });

    this.isUpdating = false;
  }

  /** Updates weight control states based on array length (single=disabled, multiple=enabled). */
  updateWeightControlStates(formArray: FormArray): void {
    const count = formArray.length;

    if (count === 0) return; //Nothing to calculate or adjust

    if (count === 1) {
      // Single medication set: disable weight control and set to 100%
      const weightControl = formArray.at(0).get(['weightFg', 'weight']);
      weightControl?.setValue(100, { emitEvent: false });
      weightControl?.disable({ emitEvent: false });
    } else {
      // Multiple medication sets: enable controls based on lock state
      formArray.controls.forEach((control) => {
        const weightControl = control.get(['weightFg', 'weight']);
        const lockControl = control.get(['weightFg', 'lock']);

        if (weightControl && lockControl && !lockControl.value) {
          weightControl.enable({ emitEvent: false });
        }
      });
    }
  }
}
