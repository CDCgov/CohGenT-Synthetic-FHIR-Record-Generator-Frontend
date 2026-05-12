import {Component, computed, inject, Inject, OnInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog, MatDialogActions,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {CohortService} from '../../../services/cohort.service';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-generation-summary-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    DatePipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatDialogActions,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './generation-summary-modal.html',
  styleUrl: './generation-summary-modal.scss'
})
export class GenerationSummaryModal implements OnInit {
  dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  cohortService = inject(CohortService);
  data = signal<any | null>(null);

  private readonly startingColumns: string[] = ['Name', 'Date of Birth', 'Sex']

  tableColumns = computed(() => {
      const fhirColumnKeys = Object.keys(this.data()?.generationSummary?.[0]?.summary?.resourceCounts);
      return [...this.startingColumns, ...fhirColumnKeys];
    }
  );

  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(
      this.data().generationSummary.map((result: any) => {
        console.log(result);
        let mapped: any = {
          Name: result.summary.name,
          ['Date of Birth']: result.summary.birthDate,
          Sex: result.summary.sex,
        }
        const fhirKeys = Object.keys(result.summary.resourceCounts);
        for (const key of fhirKeys) {
          mapped[key] = result.summary.resourceCounts[key];
        }
        return mapped;
      }));

    return dataSource;
  });

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any) {
  }

  onClose() {
    this.dialogRef.close("None");
  }

  ngOnInit(): void {
    this.data.set(this.dialogData);
  }

  onSaveAsCsv() {
    this.cohortService.convertSummaryToCsv(this.data()?.generationSummary).subscribe({
      next: (csvData: string) => {
        // Create a Blob from the CSV data
        const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});

        // Create a download link
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        // Set link attributes with timestamp for unique filename
        link.setAttribute('href', url);
        link.setAttribute('download', `${this.cohortService.cohortData()!.metadata.cohortName.trim()}.cohort-summary.csv`);
        link.style.visibility = 'hidden';

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading CSV:', error);
      }
    });
  }
}

export function openConfirmationSummaryModal(dialog: MatDialog, dialogData: any) {

  const config = new MatDialogConfig();

  config.autoFocus = true;
  config.width = "50vw";
  config.maxWidth = '90vw';
  config.minHeight = "200px";
  config.maxHeight = "90vh"

  config.data = {
    ...dialogData
  }

  const dialogRef = dialog.open(GenerationSummaryModal, config);

  return dialogRef.afterClosed();
}
