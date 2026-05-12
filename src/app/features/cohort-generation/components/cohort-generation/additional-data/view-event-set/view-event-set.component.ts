import {ChangeDetectionStrategy, Component, computed, inject, input, output, Signal} from '@angular/core';
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
  ],
  templateUrl: './view-event-set.component.html',
  styleUrl: './view-event-set.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEventSetComponent {
  private utils = inject(Utils);

  data = input.required<any>();
  editEnabled = input<boolean>(true);
  index = input<number>(0);

  onEdit = output<number>();
  onDelete = output<number>();

  /**
   * Extract data including disabled controls before passing to EventSetDataView
   */
  private extractedData = computed(() => this.utils.getFormRawValueRecursive(this.data()));

  eventSetDataView: Signal<EventSetDataView> = computed(() => new EventSetDataView(this.extractedData()));
  displayedColumns=  ['type', 'display' , 'code', 'system' , 'valueType', 'value'];

  onDeleteEventSet() {
    this.onDelete.emit(this.index());
  }

  onEditEventSet() {
    this.onEdit.emit(this.index());
  }
}
