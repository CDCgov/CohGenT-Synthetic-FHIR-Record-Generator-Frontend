import {Component, computed, inject, input, output} from '@angular/core';
import {MedicationsReviewComponent} from '../medications-review/medications-review.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MedicationHelperService} from '../../../../services/form-helpers/medication-helper.service';
import {
  openConfirmationDialog
} from '../../../../../../shared/components/confirmation-modal/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-view-medication-set',
  imports: [
    MedicationsReviewComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatSuffix,
  ],
  templateUrl: './view-medication-set.html',
  styleUrl: './view-medication-set.scss',
})
export class ViewMedicationSet {
  onEdit = output<number>();
  onDelete = output<number>();
  onCopy = output<number>();
  data = input.required<any>();
  medicationSetsFormArray = input<FormArray>();
  index = input<number>();
  editModeEnabled = input<boolean>(true); // Enables Editing. Used to switch from Review Cohort (no buntons to Edit, Delete, and Copy rendered) to Edit Medication Set
  editDisabled = input<boolean>(false); // Disables the Edit button when the user is editing another medication sets. We can only edit the sets one at a time.
  private dialog: MatDialog = inject(MatDialog);

  medicationHelperService = inject(MedicationHelperService);

  // Derive medicationSetFg from the array and index
  medicationSetFg = computed(() =>
    this.medicationSetsFormArray()?.at(this.index()) as FormGroup
  );

  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;


  protected onCopyMedicationSet(index: number) {
    this.onCopy.emit(index);
  }

  protected onEditMedicationSet(index: number) {
    this.onEdit.emit(index);
  }

  protected onDeleteMedicationSet(index: number) {
    openConfirmationDialog(
      this.dialog,
      {
        title: "Delete Confirmation",
        content: `Are you sure you want to delete Medication Set ${this.medicationSetFg().get('nameCounter').value}?`,
        primaryActionBtnTitle: "Cancel",
        secondaryActionBtnTitle: `Delete`,
        width: "40em",
        isPrimaryButtonLeft: false,
        isSecondaryActionDanger: true
      })
      .subscribe(
        action => {
          if (action == 'primaryAction') {
          } else if (action == 'secondaryAction') {
            this.onDelete.emit(index);
          }
        }
      );
  }

  protected toggleLock() {
    const weightFg = this.medicationSetFg()?.get('weightFg');
    const lockControl = weightFg?.get('lock');
    const weightControl = weightFg?.get('weight');

    if (lockControl && weightControl) {
      const newLockValue = !lockControl.value;
      lockControl.setValue(newLockValue, { emitEvent: false });

      // Enable/disable the weight control based on lock state
      if (newLockValue) {
        weightControl.disable({ emitEvent: false });
      } else {
        weightControl.enable({ emitEvent: false });
      }
    }
  }

  protected onWeightFocus() {
    this.medicationHelperService.onFocus(this.medicationSetsFormArray(), this.index());
  }

  protected onWeightBlur() {
    this.medicationHelperService.onBlur(this.medicationSetsFormArray(), this.index());
  }

  protected calculateWeights() {
    this.medicationHelperService.onBlur(this.medicationSetsFormArray(), this.index());
  }
}
