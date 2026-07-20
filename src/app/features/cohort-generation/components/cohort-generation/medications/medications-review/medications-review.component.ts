/**
 * Component for displaying a read-only review table of medications.
 * Shows medication details including display name, code, system, and dosage in a Material table.
 */
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
import {Medication} from '../../../../models/medication';

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
  /** Array of medications to display in the review table */
  medications = input.required<Medication[] | undefined>();

  /** Column definitions for the Material table (display, code, system, dosage) */
  readonly displayedColumns: string[] = ['display', 'code', 'system', 'dosage'];

  /** Computed data source for the Material table, automatically updates when medications change */
  readonly dataSource = computed(() => {
    return new  MatTableDataSource(this.medications());
  });
}
