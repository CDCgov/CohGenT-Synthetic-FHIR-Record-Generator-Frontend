import {Pipe, PipeTransform} from '@angular/core';
import {SYSTEM_LIST} from '../../../constants/app-constants';
import {Concept} from '../models/cohort-generation-request-body';

@Pipe({
  name: 'systemStr'
})
export class SystemStrPipe implements PipeTransform {
  readonly SYSTEM_LIST = SYSTEM_LIST

  transform(concept: Concept | { system?: string; systemUri?: string } | undefined | null): string {
    if (!concept) {
      return '';
    }
    const systemStr = this.SYSTEM_LIST.find(el => el.uri === concept.system)?.label;
    const result =  systemStr == 'Other' ? concept.systemUri : systemStr;
    return result ?? ''
  }

}
