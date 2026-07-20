/**
 * Displays event set details in a table format with edit and delete actions.
 * Shows observations, procedures, and radiology reports with their associated values.
 */
import {ChangeDetectionStrategy, Component, computed, inject, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SystemStrPipe} from '../../../../pipes/system-str-pipe';
import {EventSetDataView} from '../../../../models/event-set-data-view';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {Utils} from '../../../../services/utils.service';
import {MatTooltip} from '@angular/material/tooltip';
import {
  openConfirmationDialog
} from '../../../../../../shared/components/confirmation-modal/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {CohortService} from '../../../../services/cohort.service';
@Component({
  selector: 'app-view-event-set',
  imports: [
    MatIconButton,
    MatIcon,
    SystemStrPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatTooltip,
  ],
  templateUrl: './view-event-set.component.html',
  styleUrl: './view-event-set.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEventSetComponent {
  /** Utility service for form operations */
  private utils = inject(Utils);

  /** Dialog for confirmation modals */
  private dialog: MatDialog = inject(MatDialog);

  /** Cohort service for accessing cohort data */
  cohortService: CohortService = inject(CohortService);

  /** UI constants for labels and messages */
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Event set form data to display */
  data = input.required<any>();

  /** Controls whether edit/delete buttons are rendered (e.g., hidden in Review mode) */
  editModeEnabled = input<boolean>(true);

  /** Index of this event set in the parent array */
  index = input<number>(0);

  /** Disables the edit button when another event set is being edited */
  editDisabled = input<boolean>(false);

  /** Emits when edit button is clicked */
  onEdit = output<number>();

  /** Emits when delete button is clicked */
  onDelete = output<number>();

  /** Computed signal that transforms form data into a structured view model */
  eventSetDataView = computed(() => {
    const rawData = this.utils.getFormRawValueRecursive(this.data());
    return new EventSetDataView(rawData);
  }, { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) });

  /** Table columns to display */
  displayedColumns=  ['type', 'display' , 'code', 'system' , 'valueType', 'value'];

  /** Opens confirmation dialog before deleting an event set */
  onDeleteEventSet(index: number) {

    openConfirmationDialog(
      this.dialog,
      {
        title: "Delete Confirmation",
        content: `Are you sure you want to delete Clinical Data Set ${index + 1}?`,
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
            this.onDelete.emit(this.index());
          }
        }
      );
  }

  /** Emits edit event with the event set index o the parent component */
  onEditEventSet() {
    this.onEdit.emit(this.index());
  }
}
