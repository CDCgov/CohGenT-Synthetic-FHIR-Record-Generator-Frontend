import { Pipe, PipeTransform } from '@angular/core';
import {UI_CONSTANTS} from '../../../constants/ui-constants';

@Pipe({
  name: 'ruleDescription'
})
export class RuleDescriptionPipe implements PipeTransform {
  readonly DEFAULT_STRINGS = UI_CONSTANTS.COHORT_GENERATION;
  transform(ruleDescription: string, ruleType: string): string | null {
    if (!ruleType) {
      return null;
    }
    else if(ruleDescription){
      return ruleDescription;
    }
    else if(ruleType == 'medication'){
      return this.DEFAULT_STRINGS.MEDICATIONS.STEP_DESCRIPTION;
    }
    else if(ruleType == 'additional-data-time-series'){
      return this.DEFAULT_STRINGS.ADDITIONAL_DATA.STEP_DESCRIPTION;
    }
    else {
      return ruleDescription;
    }
  }

}
