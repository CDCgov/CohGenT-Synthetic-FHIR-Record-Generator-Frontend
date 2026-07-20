/**
 * Modal component for submitting issues or feedback about the cohort generation tool.
 * Provides a form for users to report problems or suggest improvements.
 */
import {Component, inject} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-issue-submission-modal',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatHint
  ],
  templateUrl: './issue-submission-modal.component.html',
  styleUrl: './issue-submission-modal.component.scss',
})
export class IssueSubmissionModal {
  /** Reference to the dialog for closing and returning data */
  private readonly dialogRef = inject(MatDialogRef<IssueSubmissionModal>);

  /** Form builder service for creating reactive forms */
  private fb = inject(FormBuilder);

  /** Form group containing the issue description field */
  form = this.fb.group({
    description: ['', Validators.required],
  });

  /** Closes the modal dialog without submitting */
  onClose(): void {
    this.dialogRef.close();
  }

  /** Submits the issue form and closes the modal with the form data */
  protected onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}


/**
 * Opens the issue submission modal dialog.
 * @param dialog - MatDialog service for opening the modal
 * @param dialogData - Optional data to pass to the modal
 * @returns Observable that emits when the dialog is closed
 */
export function openIssueSubmissionModal(
  dialog: MatDialog,
  dialogData?: Partial<ConceptFinderDialogData>
) {
  const config: MatDialogConfig = {
    autoFocus: true,
    width: '55vw',
    maxWidth: '90vw',
    disableClose: false,
  };

  return dialog.open(IssueSubmissionModal, config).afterClosed();
}
