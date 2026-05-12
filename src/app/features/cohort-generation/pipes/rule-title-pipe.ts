import { Pipe, PipeTransform } from '@angular/core';
import {UI_CONSTANTS} from '../../../constants/ui-constants';

@Pipe({
  name: 'ruleTitle'
})
export class RuleTitlePipe implements PipeTransform {
  readonly DEFAULT_STRINGS = UI_CONSTANTS.COHORT_GENERATION;
  transform(ruleTitle: string, ruleType: string): string | null {
    if (!ruleType){
      return null;
    }
    else if (ruleTitle){
      return ruleTitle;
    }
    else if(ruleType == 'medication'){
      return this.DEFAULT_STRINGS.MEDICATIONS.STEP_TITLE;
    }
    else if(ruleType == 'additional-data-time-series'){
      return this.DEFAULT_STRINGS.ADDITIONAL_DATA.STEP_TITLE;
    }
    else {
      return ruleTitle;
    }
  }
}
