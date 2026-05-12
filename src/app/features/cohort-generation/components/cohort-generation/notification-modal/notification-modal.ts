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
  private readonly dialogRef = inject(MatDialogRef<NotificationModal>);
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: NotificationDialogData) {
  }

  ngOnInit(): void {
    this.message = this.dialogData.message;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}

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
