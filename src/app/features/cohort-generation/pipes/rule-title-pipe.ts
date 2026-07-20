import { Pipe, PipeTransform } from '@angular/core';
import {UI_CONSTANTS} from '../../../constants/ui-constants';

/**
 * Angular pipe that provides title text for form rules.
 * Returns the rule's custom title if provided, otherwise falls back to
 * default titles for specific rule types (medication, additional-data-time-series).
 *
 * This pipe is used in templates to display step titles in the stepper and
 * form headers, providing users with clear labels for each workflow step.
 *
 * Similar to RuleDescriptionPipe but for titles instead of descriptions.
 *
 * @example
 * // In template with custom title:
 * {{ 'Patient Demographics' | ruleTitle:'custom' }}
 * // Output: "Patient Demographics"
 *
 * @example
 * // In template without custom title (medication type):
 * {{ '' | ruleTitle:'medication' }}
 * // Output: Default medication step title from UI_CONSTANTS
 *
 * @example
 * // In template without custom title (additional data type):
 * {{ null | ruleTitle:'additional-data-time-series' }}
 * // Output: Default additional data step title from UI_CONSTANTS
 */
@Pipe({
  name: 'ruleTitle'
})
export class RuleTitlePipe implements PipeTransform {
  /** Reference to cohort generation UI constants for default titles */
  readonly DEFAULT_STRINGS = UI_CONSTANTS.COHORT_GENERATION;

  /**
   * Transforms rule title and type into display text.
   * Returns custom title if provided, otherwise returns default title
   * based on rule type.
   *
   * @param ruleTitle - Custom title text for the rule (may be null/empty)
   * @param ruleType - Type of the rule (e.g., 'medication', 'additional-data-time-series', 'custom')
   * @returns The title text to display, or null if no rule type is provided
   *
   * @example
   * // With custom title
   * transform('Demographics', 'custom')
   * // Returns: "Demographics"
   *
   * @example
   * // Without custom title, medication type
   * transform('', 'medication')
   * // Returns: Default medication title from UI_CONSTANTS
   *
   * @example
   * // Without custom title, additional data type
   * transform(null, 'additional-data-time-series')
   * // Returns: Default additional data title from UI_CONSTANTS
   *
   * @example
   * // No rule type provided
   * transform('Some title', '')
   * // Returns: null
   */
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
