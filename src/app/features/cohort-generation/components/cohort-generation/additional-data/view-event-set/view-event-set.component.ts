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
  private utils = inject(Utils);
  private dialog: MatDialog = inject(MatDialog);
  cohortService: CohortService = inject(CohortService);
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  data = input.required<any>();
  editModeEnabled = input<boolean>(true);
  index = input<number>(0);
  editDisabled = input<boolean>(false);

  onEdit = output<number>();
  onDelete = output<number>();

  eventSetDataView = computed(() => {
    const rawData = this.utils.getFormRawValueRecursive(this.data());
    return new EventSetDataView(rawData);
  }, { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) });

  displayedColumns=  ['type', 'display' , 'code', 'system' , 'valueType', 'value'];

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

  onEditEventSet() {
    this.onEdit.emit(this.index());
  }
}
