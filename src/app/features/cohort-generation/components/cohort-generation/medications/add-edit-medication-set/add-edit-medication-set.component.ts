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
  @ViewChild('medicationsContainer') medicationsContainer?: ElementRef;

  medicationSetFg = input.required<FormGroup>();
  tempFormValueStorage = input<any>();

  onCancel = output();
  onSave = output();

  utils = inject(Utils)

  private medicationHelperService = inject(MedicationHelperService);
  private shouldScrollToBottom = false;

  get medicationFromArray(): FormArray {
    return this.medicationSetFg().get('medications') as FormArray;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.medicationsContainer) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  addMedication(): void {
    this.medicationHelperService.addMedication(this.medicationFromArray);
    this.shouldScrollToBottom = true;
  }

  onDeleteMedication(index: number): void {
    this.medicationHelperService.deleteMedication(index, this.medicationFromArray);
  }

  private scrollToBottom(): void {
    if (this.medicationsContainer) {
      const element = this.medicationsContainer.nativeElement;
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }

  onCancelMedicationSetEdit() {
    this.removeControlsMarkedForDeletion(this.medicationFromArray);
    this.medicationSetFg().patchValue(this.tempFormValueStorage(), {emitEvent: false});
    this.onCancel.emit();
  }

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

