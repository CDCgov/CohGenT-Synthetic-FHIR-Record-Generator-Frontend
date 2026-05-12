import { Pipe, PipeTransform } from '@angular/core';
import {FormRule} from '../models/use-case';

@Pipe({
  name: 'ruleLabel'
})
export class RuleLabelPipe implements PipeTransform {

  transform(ruleId: string, rule: FormRule): string {
    if(!ruleId || !rule?.options?.length) {
      return '';
    }
    return rule.options.find(option =>
      option.ruleId === ruleId
    )?.label ?? '';
  }
}
