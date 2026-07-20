/**
 * Component for adding or editing a medication set with multiple medications.
 * Provides form controls for medication selection, dosage, frequency, and weight distribution.
 * Supports adding, deleting medications and automatic scrolling to newly added items.
 */
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  input,
  output,
  ViewChild
} from '@angular/core';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

import {MedicationFormComponent} from '../medication-form/medication-form.component';
import {MedicationHelperService} from '../../../../services/form-helpers/medication-helper.service';
import {Utils} from '../../../../services/utils.service';

@Component({
  selector: 'app-add-edit-medication-set',
  imports: [
    FormsModule,
    MatIcon,
    ReactiveFormsModule,
    MedicationFormComponent,
    MatButton
  ],
  templateUrl: './add-edit-medication-set.component.html',
  styleUrl: './add-edit-medication-set.component.scss',
})
export class AddEditMedicationSet implements AfterViewChecked {
  /** Reference to the medications container element for scrolling */
  @ViewChild('medicationsContainer') medicationsContainer?: ElementRef;

  /** The form group containing the medication set data */
  medicationSetFg = input.required<FormGroup>();

  /** Temporary storage for form values during editing for cancel functionality */
  tempFormValueStorage = input<any>();

  /** Event emitted when editing is cancelled */
  onCancel = output();

  /** Event emitted when the medication set is saved */
  onSave = output();

  /** Utility service for form operations */
  utils = inject(Utils)

  /** Service for medication form helpers and operations */
  private medicationHelperService = inject(MedicationHelperService);

  /**
   * Flag indicating whether to scroll to bottom after the next view check.
   * Set to true in addMedication() to automatically scroll the container
   * and bring the newly added medication into view.
   */
  private shouldScrollToBottom = false;

  /** Getter that returns the medications form array from the medication set */
  get medicationFromArray(): FormArray {
    return this.medicationSetFg().get('medications') as FormArray;
  }

  /** Lifecycle hook that scrolls to bottom if flag is set */
  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.medicationsContainer) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  /** Adds a new medication to the medications form array and triggers scroll */
  addMedication(): void {
    this.medicationHelperService.addMedication(this.medicationFromArray);
    this.shouldScrollToBottom = true;
  }

  /** Deletes a medication at the specified index and redistributes weights */
  onDeleteMedication(index: number): void {
    this.medicationHelperService.deleteMedication(index, this.medicationFromArray);
  }

  /** Scrolls the medications container to the bottom */
  private scrollToBottom(): void {
    if (this.medicationsContainer) {
      const element = this.medicationsContainer.nativeElement;
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }

  /** Cancels editing, removes controls marked for deletion, and restores previous values */
  onCancelMedicationSetEdit() {
    this.removeControlsMarkedForDeletion(this.medicationFromArray);
    this.medicationSetFg().patchValue(this.tempFormValueStorage(), {emitEvent: false});
    this.onCancel.emit();
  }

  /** Saves the medication set after validation, marking all medications as saved */
  onSaveMedicationSet() {
    this.utils.markFormGroupTouched(this.medicationSetFg());
    this.medicationSetFg().updateValueAndValidity();
    if (this.medicationSetFg().valid) {
      const medicationsFgArray = this.medicationSetFg().get('medications') as FormArray;
      medicationsFgArray.controls.forEach(control => {
        control.get('deleteOnCancel')?.patchValue(false, {emitEvent: false});
      });
      this.onSave.emit();
    }
  }

  /** Removes form controls that are marked for deletion (deleteOnCancel = true) */
  private removeControlsMarkedForDeletion(formArray: FormArray): void {
    if (!formArray || formArray.length === 0) {
      return;
    }

    // Keep controls where deleteOnCancel is NOT true
    const controlsToKeep = formArray.controls.filter(
      control => !control.get('deleteOnCancel')?.value
    );

    formArray.clear();
    controlsToKeep.forEach(control => formArray.push(control));
  }
}
