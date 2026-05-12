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
  private readonly dialogRef = inject(MatDialogRef<IssueSubmissionModal>);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    description: ['', Validators.required],
  });

  onClose(): void {
    this.dialogRef.close(null);
  }

  protected onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}


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
