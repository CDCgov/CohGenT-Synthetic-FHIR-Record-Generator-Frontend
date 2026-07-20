/**
 * Represents data passed to a notification dialog component.
 * Used to display informational messages, warnings, or alerts to the user
 * in a modal dialog.
 *
 */
export interface NotificationDialogData {
  /**
   * The message text to display in the notification dialog.
   * Can be a simple string or contain HTML for formatted content.
   */
  message: string;
}
