/**
 * Component for managing additional clinical data event sets (observations, procedures, radiology reports).
 * Handles creation, editing, deletion, and validation of event sets in the cohort generation workflow.
 */
import {Component, computed, inject, input, signal} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {AdditionalDataHelperService} from '../../../services/form-helpers/additional-data-helper.service';
import {ViewEventSetComponent} from './view-event-set/view-event-set.component';
import {AddEditEventSetComponent} from './add-edit-event-set/add-edit-event-set.component';
import {StepperLockTracker} from '../../../services/form-helpers/stepper-lock-tracker';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';

@Component({
  selector: 'app-additional-data',
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ViewEventSetComponent,
    AddEditEventSetComponent,
    ViewEventSetComponent,
  ],
  templateUrl: './additional-data.component.html',
  styleUrl: './additional-data.component.scss',
})
export class AdditionalDataComponent {
  /** Parent form group containing the additional data form array */
  form = input.required<FormGroup>();

  /** Tracks whether any event set is currently being edited */
  isEditing = signal(false);

  /** Stores form values before editing to enable cancel functionality */
  tempFormValueStorage = signal<any | null>(null);

  /** UI constants for labels and messages */
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Service for managing additional data form operations */
  additionalDataHelperService = inject(AdditionalDataHelperService);

  /** Service for managing stepper navigation locks */
  stepLockTracker = inject(StepperLockTracker);

  /** Computed signal returning the additional data form array */
  additionalDataFormArray = computed(() =>
    this.form().get('additional-data-time-series') as FormArray
  );

  /** Type guard to check if a control is a FormGroup */
  isFormGroup(control: AbstractControl): control is FormGroup {
    return control instanceof FormGroup;
  }

  /** Adds a new event set to the form array and enters edit mode */
  addEvent(additionalDataFormArray: FormArray) {
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
    this.additionalDataFormArray().updateValueAndValidity();
    if(this.additionalDataFormArray().valid) {
      // The nameCounter is used to store the numerical value of the Event Set Name. For example for Event Set 1, the numerical counter is the number 1.
      let nameCounter: null| number = null;

      if(this.additionalDataFormArray().controls.length > 0){
        // If the additional data has multiple event set, we need to find the nameCounter of the last Event Set
        const lasCounterName = this.additionalDataFormArray().at(this.additionalDataFormArray().length - 1).get('nameCounter').value as number;
        nameCounter = lasCounterName + 1;
      }

      this.additionalDataHelperService.addEvent(additionalDataFormArray);

      if(nameCounter){
        this.additionalDataFormArray().at(this.additionalDataFormArray().length - 1).get('nameCounter').patchValue(nameCounter, {emitEvent: false});
      }

      this.isEditing.set(true);
    }
  }

  /** Removes an event set from the form array */
  onDeleteEventSet(index: number) {
    this.additionalDataFormArray().controls.splice(index, 1);
    this.additionalDataFormArray().updateValueAndValidity();
  }

  /** Enters edit mode for an event set, storing current values for potential cancel */
  onEditEventSet(additionalDataFg : FormGroup) {
    this.tempFormValueStorage.set(JSON.parse(JSON.stringify(additionalDataFg.value)));
    additionalDataFg.get('isInEditMode').patchValue(true, {emitEvent: false});
    this.stepLockTracker.setStepperLock(true, this.UI_CONSTANTS.FINISH_EDITING_ERROR_MSG);
    this.isEditing.set(true);
  }

  /** Saves changes to an event set and exits edit mode if valid */
  onSave(additionalDataFg: FormGroup) {
    this.additionalDataFormArray().updateValueAndValidity();
    if(additionalDataFg.valid){
      additionalDataFg.get(['deleteOnCancel']).patchValue(false);
      additionalDataFg.get('isInEditMode').patchValue(false, {emitEvent: false});
      this.stepLockTracker.setStepperLock(false);
      this.isEditing.set(false);
    }
  }

  /** Cancels editing, either deleting new event sets or restoring previous values */
  onCancel(additionalDataFg: FormGroup, index: number) {
    // if the last element is canceled, just delete it
    if(additionalDataFg.get('deleteOnCancel').value == true) {
      this.additionalDataFormArray().controls.splice(index, 1);
    }
    else{
      additionalDataFg.patchValue(this.tempFormValueStorage());
      additionalDataFg.get('isInEditMode').patchValue(false, {emitEvent: false});
    }
    this.additionalDataFormArray().updateValueAndValidity();
    this.isEditing.set(false);
    this.stepLockTracker.setStepperLock(false);
  }
}
