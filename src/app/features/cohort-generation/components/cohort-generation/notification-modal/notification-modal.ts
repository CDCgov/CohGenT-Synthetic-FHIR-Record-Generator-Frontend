/**
 * Modal dialog component for displaying notification messages to the user.
 * Provides a simple dialog with a message and close button.
 */
import {Component, Inject, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogConfig, MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NotificationDialogData} from '../../../models/notification-dialog-data';

@Component({
  selector: 'app-notification-modal',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
  ],
  templateUrl: './notification-modal.html',
  styleUrl: './notification-modal.scss',
})
export class NotificationModal implements OnInit {
  /** Reference to the dialog for closing */
  private readonly dialogRef = inject(MatDialogRef<NotificationModal>);

  /** The notification message to display */
  message: string = '';

  /**
   * Constructor that receives the dialog data
   * @param dialogData - The notification data containing the message
   */
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: NotificationDialogData) {
  }

  /** Lifecycle hook that initializes the message from dialog data */
  ngOnInit(): void {
    this.message = this.dialogData.message;
  }

  /** Closes the dialog without returning any data */
  onClose(): void {
    this.dialogRef.close(null);
  }
}

/**
 * Helper function to open a notification dialog.
 * @param dialog - The MatDialog service instance
 * @param dialogData - Optional notification data containing the message to display
 * @returns Observable that emits when the dialog is closed
 */
export function opeNotification(
  dialog: MatDialog,
  dialogData?: NotificationDialogData
) {
  const config: MatDialogConfig<NotificationDialogData> = {
    autoFocus: true,
    maxWidth: '90vw',
    minHeight: '48px',
    disableClose: false,
    data: {
      message: dialogData?.message,
    }
  };

  return dialog.open(NotificationModal, config).afterClosed();
}
