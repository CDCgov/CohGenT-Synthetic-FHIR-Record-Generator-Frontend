/**
 * Component for displaying a read-only view of a medication set with action buttons.
 * Shows medication set details, weight distribution, and provides edit, delete, and copy functionality.
 * Can be used in both edit mode (with action buttons) and review mode (read-only).
 */
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
  /** Event emitted when the edit button is clicked */
  onEdit = output<number>();

  /** Event emitted when the delete button is clicked (after confirmation) */
  onDelete = output<number>();

  /** Event emitted when the copy button is clicked */
  onCopy = output<number>();

  /** The medication set data to display */
  data = input.required<any>();

  /** The form array containing all medication sets */
  medicationSetsFormArray = input<FormArray>();

  /** The index of this medication set in the array */
  index = input<number>();

  /** Enables edit mode with action buttons. Set to false for read-only review mode */
  editModeEnabled = input<boolean>(true);

  /** Disables the edit button when another medication set is being edited */
  editDisabled = input<boolean>(false);

  /** Dialog service for confirmation dialogs */
  private dialog: MatDialog = inject(MatDialog);

  /** Service for medication form helpers and weight calculations */
  medicationHelperService = inject(MedicationHelperService);

  /** Computed form group for this specific medication set derived from array and index */
  medicationSetFg = computed(() =>
    this.medicationSetsFormArray()?.at(this.index()) as FormGroup
  );

  /** UI constants for medication labels and messages */
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.MEDICATIONS;


  /** Emits the copy event with the medication set index */
  protected onCopyMedicationSet(index: number) {
    this.onCopy.emit(index);
  }

  /** Emits the edit event with the medication set index */
  protected onEditMedicationSet(index: number) {
    this.onEdit.emit(index);
  }

  /** Opens confirmation dialog and emits delete event if confirmed */
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

  /** Toggles the lock state of the weight control, enabling/disabling weight editing */
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

  /** Handles weight input focus, preparing for weight redistribution */
  protected onWeightFocus() {
    this.medicationHelperService.onFocus(this.medicationSetsFormArray(), this.index());
  }

  /** Handles weight input blur, triggering weight redistribution among unlocked sets */
  protected onWeightBlur() {
    this.medicationHelperService.onBlur(this.medicationSetsFormArray(), this.index());
  }

  /** Manually triggers weight recalculation and redistribution */
  protected calculateWeights() {
    this.medicationHelperService.onBlur(this.medicationSetsFormArray(), this.index());
  }
}
