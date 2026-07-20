/**
 * Component for displaying concept information in a simple, read-only format.
 * Shows concept display name, code, and system information with optional empty/error messages.
 */
import {Component, input} from '@angular/core';
import {SystemStrPipe} from '../../../../../pipes/system-str-pipe';

/** Interface defining the structure of a concept display object */
export interface ConceptDisplay {
  /** The coding system name */
  system?: string;
  /** The coding system URI */
  systemUri?: string;
  /** The concept code */
  code?: string;
  /** The concept display name */
  display?: string;
}

@Component({
  selector: 'app-concept-simple-display',
  imports: [
    SystemStrPipe,
  ],
  templateUrl: './concept-simple-display.component.html',
  styleUrls: ['./concept-simple-display.component.scss']
})
export class ConceptSimpleDisplayComponent {
  /** The concept value to display */
  conceptValue = input<ConceptDisplay | null | undefined>();

  /** Whether to show an empty message when no concept is selected */
  showEmptyMessage = input<boolean>(false);

  /** The message to display when no concept is selected */
  emptyMessage = input<string>('No concept selected.');

  /** Optional error message to display */
  errorMessage = input<string | null>(null);

  /** Checks if the concept has all required values (system, code, and display) */
  hasRequiredValues(): boolean {
    const concept = this.conceptValue();
    return !!(concept?.system && concept?.code && concept?.display);
  }
}
