/**
 * Component for managing medication sets in cohort generation.
 * Provides functionality to add, edit, copy, and delete medication sets with weight distribution.
 */
import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import {FormArray, FormGroup, isFormGroup} from '@angular/forms';
import {MedicationHelperService} from '../../../services/form-helpers/medication-helper.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AddEditMedicationSet} from './add-edit-medication-set/add-edit-medication-set.component';
import {ViewMedicationSet} from './view-medication-set/view-medication-set';
import {StepperLockTracker} from '../../../services/form-helpers/stepper-lock-tracker';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {DecimalPipe} from '@angular/common';
import {MatError} from '@angular/material/input';

@Component({
  selector: 'app-medications',
  imports: [
    MatButton,
    MatIcon,
    AddEditMedicationSet,
    ViewMedicationSet,
    AddEditMedicationSet,
    DecimalPipe,
    MatError,
  ],
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.scss'
})

export class MedicationsComponent implements AfterViewChecked {
  /** Reference to the medication sets container element for scrolling */
  @ViewChild('medicationSetsContainer') medicationSetsContainer?: ElementRef;

  /** The form group containing medication data */
  form = input.required<FormGroup>();

  /** Signal indicating whether a medication set is currently being edited */
  isEditing = signal(false);

  /** Temporary storage for form values during editing for cancel functionality */
  tempFormValueStorage = signal<any | null>(null);

  /** Type guard function to check if a value is a FormGroup */
  protected readonly isFormGroup = isFormGroup;

  /** UI constants for medication labels and messages */
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;

  /** Service for medication form helpers and operations */
  medicationsHelperService = inject(MedicationHelperService);

  /** Service for tracking and managing stepper lock state */
  stepLockTracker = inject(StepperLockTracker);

  /**
   * Flag indicating whether to scroll to bottom after the next view check.
   * Set to true in onCopyMedicationSet() to automatically scroll the container
   * and bring the newly copied medication set into view, providing immediate
   * visual feedback to the user.
   */
  private shouldScrollToBottom = false;

  /** Computed signal that returns the medication sets form array */
  medicationSetsFormArray = computed(() =>
    this.form().get('medication') as FormArray
  );

  /** Adds a new medication set to the form array */
  addMedicationSet(medicationSetsFormArray: FormArray) {
    this.medicationSetsFormArray().updateValueAndValidity();
    if (!this.medicationSetsFormArray().valid) {
      return;
    }
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
    this.medicationsHelperService.addMedicationSet(medicationSetsFormArray);
    this.isEditing.set(true);
  }

  /** Saves the medication set after editing */
  onSave(medicationSetFg: FormGroup<any>) {
    this.medicationSetsFormArray().updateValueAndValidity();
    if(medicationSetFg.valid){
      medicationSetFg.get(['deleteOnCancel']).patchValue(false);
      medicationSetFg.get('isInEditMode').patchValue(false, {emitEvent: false});
      this.isEditing.set(false);
      this.stepLockTracker.setStepperLock(false);
    }
  }

  /** Cancels editing a medication set, either deleting it or restoring previous values */
  onCancel(medicationSetFg: FormGroup<any>, index: number) {
    // if the last element is canceled, just delete it
    if(medicationSetFg.get('deleteOnCancel').value == true) {
      this.medicationSetsFormArray().controls.splice(index, 1);
      // Update weight control states after deletion
      this.medicationsHelperService.updateWeightControlStates(this.medicationSetsFormArray());
    }
    else{
      medicationSetFg.patchValue(this.tempFormValueStorage());
      medicationSetFg.get('isInEditMode').patchValue(false, {emitEvent: false});
    }
    this.medicationSetsFormArray().updateValueAndValidity();
    this.stepLockTracker.setStepperLock(false);
    this.isEditing.set(false);
  }

  /** Deletes a medication set and redistributes weights among remaining sets */
  onDeleteMedicationSet(index: number) {

    if (this.medicationSetsFormArray().length === 3) {
      // Iterate through all medication sets and unlock them
      this.medicationSetsFormArray().controls.forEach((control) => {
        const weightFg = control.get('weightFg');
        const lockControl = weightFg?.get('lock');
        const weightControl = weightFg?.get('weight');

        // Unlock the field
        lockControl?.setValue(false, { emitEvent: false });

        // Enable the weight control since it's now unlocked
        weightControl?.enable({ emitEvent: false });
      });
    }

    const medicationSetFg = this.medicationSetsFormArray().at(index);
    const weightFg = medicationSetFg.get('weightFg');


    // Store current weight and unlock the field
    const currentWeight = weightFg?.get('weight')?.value ?? 0;
    weightFg?.get('lock')?.setValue(false, { emitEvent: false });

    // Only trigger redistribution if the deleted set has non-zero weight
    if (currentWeight > 0) {
      // Set weight to 0 and trigger redistribution before deletion
      this.medicationsHelperService.onFocus(this.medicationSetsFormArray(), index);
      weightFg?.get('weight')?.setValue(0, { emitEvent: false });
      this.medicationsHelperService.onBlur(this.medicationSetsFormArray(), index);
    }

    // Remove the medication set
    this.medicationSetsFormArray().controls.splice(index, 1);
    this.medicationSetsFormArray().updateValueAndValidity();

    // Update control states (enable/disable based on array length)
    this.medicationsHelperService.updateWeightControlStates(this.medicationSetsFormArray());
  }

  /** Lifecycle hook that scrolls to bottom if flag is set */
  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.medicationSetsContainer) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  /** Copies a medication set and triggers scroll to the new set */
  onCopyMedicationSet(index: number) {
    this.medicationsHelperService.copyMedicationSet(
      this.medicationSetsFormArray(),
      index
    );
    // Update validation after copying
    this.medicationSetsFormArray().updateValueAndValidity();
    // Trigger scroll to bottom after copy
    this.shouldScrollToBottom = true;
  }

  /** Scrolls the medication sets container to the bottom */
  private scrollToBottom(): void {
    if (this.medicationSetsContainer) {
      const element = this.medicationSetsContainer.nativeElement;
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }

  /** Enters edit mode for a medication set, storing current values for cancel */
  onEditMedicationSet(medicationSetFg : FormGroup) {
    this.tempFormValueStorage.set(JSON.parse(JSON.stringify(medicationSetFg.value)));
    medicationSetFg.get('isInEditMode').patchValue(true, {emitEvent: false});
    this.isEditing.set(true);
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
  }
}
