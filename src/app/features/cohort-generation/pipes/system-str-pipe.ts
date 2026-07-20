import {Pipe, PipeTransform} from '@angular/core';
import {SYSTEM_LIST} from '../../../constants/app-constants';
import {Concept} from '../models/cohort-generation-request-body';

/**
 * Angular pipe that converts a medical terminology system URI into a human-readable label.
 * Looks up the system URI in the SYSTEM_LIST to find its display label (e.g., "SNOMED CT", "LOINC", "RxNorm").
 * For custom/other systems, returns the systemUri directly.
 *
 * This pipe is used throughout the application to display standardized terminology system names
 * when showing medical concepts to users.
 *
 * @example
 * // In template with SNOMED concept:
 * {{ snomedConcept | systemStr }}
 * // Output: "SNOMED CT" (if system URI matches SNOMED in SYSTEM_LIST)
 *
 * @example
 * // In template with custom/other system:
 * {{ customConcept | systemStr }}
 * // Output: "http://custom-terminology.org" (the systemUri value)
 *
 * @example
 * // In template with null concept:
 * {{ null | systemStr }}
 * // Output: "" (empty string)
 */
@Pipe({
  name: 'systemStr'
})
export class SystemStrPipe implements PipeTransform {
  /** Reference to the list of known medical terminology systems */
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
