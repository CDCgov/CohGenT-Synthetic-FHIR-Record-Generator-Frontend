import { Pipe, PipeTransform } from '@angular/core';
import {UI_CONSTANTS} from '../../../constants/ui-constants';

/**
 * Angular pipe that provides description text for form rules.
 * Returns the rule's custom description if provided, otherwise falls back to
 * default descriptions for specific rule types (medication, additional-data-time-series).
 *
 * This pipe is used in templates to display helpful description text for each
 * form step, providing users with context about what information to enter.
 *
 * @example
 * // In template with custom description:
 * {{ 'Enter patient demographics' | ruleDescription:'custom' }}
 * // Output: "Enter patient demographics"
 *
 * @example
 * // In template without custom description (medication type):
 * {{ '' | ruleDescription:'medication' }}
 * // Output: Default medication step description from UI_CONSTANTS
 *
 * @example
 * // In template without custom description (additional data type):
 * {{ null | ruleDescription:'additional-data-time-series' }}
 * // Output: Default additional data step description from UI_CONSTANTS
 */
@Pipe({
  name: 'ruleDescription'
})
export class RuleDescriptionPipe implements PipeTransform {
  /** Reference to cohort generation UI constants for default descriptions */
  readonly DEFAULT_STRINGS = UI_CONSTANTS.COHORT_GENERATION;

  /**
   * Transforms rule description and type into display text.
   * Returns custom description if provided, otherwise returns default description
   * based on rule type.
   *
   * @param ruleDescription - Custom description text for the rule (may be null/empty)
   * @param ruleType - Type of the rule (e.g., 'medication', 'additional-data-time-series', 'custom')
   * @returns The description text to display, or null if no rule type is provided
   *
   * @example
   * // With custom description
   * transform('Enter age and gender', 'custom')
   * // Returns: "Enter age and gender"
   *
   * @example
   * // Without custom description, medication type
   * transform('', 'medication')
   * // Returns: Default medication description from UI_CONSTANTS
   *
   * @example
   * // Without custom description, additional data type
   * transform(null, 'additional-data-time-series')
   * // Returns: Default additional data description from UI_CONSTANTS
   *
   * @example
   * // No rule type provided
   * transform('Some description', '')
   * // Returns: null
   */
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
