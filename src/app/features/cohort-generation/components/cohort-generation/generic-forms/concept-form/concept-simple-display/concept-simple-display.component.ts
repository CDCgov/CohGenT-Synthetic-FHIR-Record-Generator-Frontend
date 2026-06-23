import {Component, input} from '@angular/core';
import {SystemStrPipe} from '../../../../../pipes/system-str-pipe';

export interface ConceptDisplay {
  system?: string;
  systemUri?: string;
  code?: string;
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
  conceptValue = input<ConceptDisplay | null | undefined>();
  showEmptyMessage = input<boolean>(false);
  emptyMessage = input<string>('No concept selected.');
  errorMessage = input<string | null>(null);

  hasAllValues(): boolean {
    const concept = this.conceptValue();
    return !!(concept?.system && concept?.code && concept?.display);
  }
}
