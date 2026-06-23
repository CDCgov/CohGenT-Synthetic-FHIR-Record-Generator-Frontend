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
  @ViewChild('medicationSetsContainer') medicationSetsContainer?: ElementRef;

  form = input.required<FormGroup>();
  isEditing = signal(false);
  tempFormValueStorage = signal<any | null>(null);
  protected readonly isFormGroup = isFormGroup;
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;

  medicationsHelperService = inject(MedicationHelperService);
  stepLockTracker = inject(StepperLockTracker);

  private shouldScrollToBottom = false;

  medicationSetsFormArray = computed(() =>
    this.form().get('medication') as FormArray
  );

  addMedicationSet(medicationSetsFormArray: FormArray) {
    this.medicationSetsFormArray().updateValueAndValidity();
    if (!this.medicationSetsFormArray().valid) {
      return;
    }
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
    this.medicationsHelperService.addMedicationSet(medicationSetsFormArray);
    this.isEditing.set(true);
  }

  onSave(medicationSetFg: FormGroup<any>) {
    this.medicationSetsFormArray().updateValueAndValidity();
    if(medicationSetFg.valid){
      medicationSetFg.get(['deleteOnCancel']).patchValue(false);
      medicationSetFg.get('isInEditMode').patchValue(false, {emitEvent: false});
      this.isEditing.set(false);
      this.stepLockTracker.setStepperLock(false);
    }
  }

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

  onDeleteMedicationSet(index: number) {
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

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.medicationSetsContainer) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

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

  private scrollToBottom(): void {
    if (this.medicationSetsContainer) {
      const element = this.medicationSetsContainer.nativeElement;
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }

  onEditMedicationSet(medicationSetFg : FormGroup) {
    this.tempFormValueStorage.set(JSON.parse(JSON.stringify(medicationSetFg.value)));
    medicationSetFg.get('isInEditMode').patchValue(true, {emitEvent: false});
    this.isEditing.set(true);
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
  }
}
