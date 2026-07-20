/**
 * Modal component for displaying cohort generation summary in a table format.
 * Shows patient information and FHIR resource counts with CSV export functionality.
 */
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
import {ErrorMessageComponent} from '../../../../../shared/components/error-message/error-message.component';
import {SharedHttpErrorService} from '../../../../../shared/services/shared-http-error.service';

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
    MatTooltip,
    ErrorMessageComponent
  ],
  templateUrl: './generation-summary-modal.html',
  styleUrl: './generation-summary-modal.scss'
})
export class GenerationSummaryModal implements OnInit {
  /** Reference to the dialog for closing and returning data */
  dialogRef: MatDialogRef<any> = inject(MatDialogRef);

  /** Service for cohort-related operations including CSV conversion */
  cohortService = inject(CohortService);

  /** Signal containing the modal data including generation summary */
  data = signal<any | null>(null);

  /** Starting columns that appear first in the table */
  private readonly startingColumns: string[] = ['Name', 'Date of Birth', 'Sex']

  /** Computed signal that combines starting columns with FHIR resource count columns */
  tableColumns = computed(() => {
      const fhirColumnKeys = Object.keys(this.data()?.generationSummary?.[0]?.summary?.resourceCounts);
      return [...this.startingColumns, ...fhirColumnKeys];
    }
  );

  /** Computed signal that creates a MatTableDataSource from the generation summary data */
  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(
      this.data().generationSummary.map((result: any) => {
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

  /** Constructor that receives dialog data via dependency injection */
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any) {
  }

  /** Closes the modal dialog */
  onClose() {
    this.dialogRef.close("None");
  }

  /** Initializes the component by setting the data signal from dialog data */
  ngOnInit(): void {
    this.data.set(this.dialogData);
  }

  /** Converts the generation summary to CSV format and triggers a download */
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

/**
 * Opens the generation summary modal dialog with the provided data.
 * Configures dialog size and handles error state cleanup on close.
 * @param dialog - MatDialog service for opening the modal
 * @param dialogData - Data to display in the modal
 * @param sharedHttpErrorService - Service for managing HTTP error display
 * @returns Observable that emits when the dialog is closed
 */
export function openConfirmationSummaryModal(dialog: MatDialog, dialogData: any, sharedHttpErrorService: SharedHttpErrorService) {

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
  // Clean up error state when dialog closes
  dialogRef.afterClosed().subscribe(() => {
    sharedHttpErrorService.hideErrorComponent();
  });

  return dialogRef.afterClosed();
}
