import { Pipe, PipeTransform } from '@angular/core';
import {SummaryOption} from '../components/cohort-generation/defaults-summary/defaults-summary';

@Pipe({
  name: 'summaryValueFormat',
})
export class SummaryValueFormatPipe implements PipeTransform {
  transform(opt: SummaryOption): string {
    switch (opt.control) {
      case 'location':
        return `${opt.value.city || ''} ${opt.value.state || ''}`.trim();
      case 'range':
        return `${opt.value.min} - ${opt.value.max}`;
      case 'checkbox':
        return opt.value ? 'Yes' : 'No';
      default:
        return JSON.stringify(opt.value);
    }
  }
}
