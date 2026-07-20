import { Pipe, PipeTransform } from '@angular/core';
import {FormRule} from '../models/use-case';

/**
 * Angular pipe that retrieves the display label for a form option by its rule ID.
 * Searches through a FormRule's options array to find the matching option and
 * returns its label property.
 *
 * This pipe is used in templates to display human-readable labels for form options
 * when you have the rule ID but need to show the user-friendly label text.
 *
 * @example
 * // In template:
 * {{ 'age-range' | ruleLabel:demographicsRule }}
 * // Output: "Age Range" (if that's the label for the 'age-range' option)
 *
 * @example
 * // With invalid rule ID:
 * {{ 'invalid-id' | ruleLabel:demographicsRule }}
 * // Output: "" (empty string)
 *
 * @example
 * // With null rule:
 * {{ 'age-range' | ruleLabel:null }}
 * // Output: "" (empty string)
 */
@Pipe({
  name: 'ruleLabel'
})
export class RuleLabelPipe implements PipeTransform {

  /**
   * Transforms a rule ID into its corresponding display label by searching
   * through the FormRule's options.
   *
   * @param ruleId - The unique identifier of the form option to find
   * @param rule - The FormRule object containing the options array to search
   * @returns The label of the matching option, or empty string if not found or invalid inputs
   *
   * @example
   * // Valid rule ID found
   * const rule = { options: [{ ruleId: 'age', label: 'Age Range' }] };
   * transform('age', rule)
   * // Returns: "Age Range"
   *
   * @example
   * // Rule ID not found
   * const rule = { options: [{ ruleId: 'age', label: 'Age Range' }] };
   * transform('gender', rule)
   * // Returns: ""
   *
   * @example
   * // Null or undefined inputs
   * transform(null, rule)  // Returns: ""
   * transform('age', null)  // Returns: ""
   *
   * @example
   * // Rule with no options
   * const rule = { options: [] };
   * transform('age', rule)
   * // Returns: ""
   */
  transform(ruleId: string, rule: FormRule): string {
    if(!ruleId || !rule?.options?.length) {
      return '';
    }
    return rule.options.find(option =>
      option.ruleId === ruleId
    )?.label ?? '';
  }
}
