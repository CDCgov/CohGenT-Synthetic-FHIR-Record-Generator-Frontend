import {Component, computed, input} from '@angular/core';
import {SystemStrPipe} from '../../../../pipes/system-str-pipe';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'app-medications-review',
  imports: [
    SystemStrPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow
  ],
  templateUrl: './medications-review.component.html',
  styleUrl: './medications-review.component.scss'
})
export class MedicationsReviewComponent {
  medications = input.required<Medication[] | undefined>();
  readonly displayedColumns: string[] = ['display', 'code', 'system', 'dosage'];
  readonly dataSource = computed(() => {
    return new  MatTableDataSource(this.medications());
  });
}
