import { Pipe, PipeTransform } from '@angular/core';
import {SummaryOption} from '../components/cohort-generation/defaults-summary/defaults-summary';

/**
 * Angular pipe that formats form option values for display in summary views.
 * Provides human-readable formatting for different control types (location, range, checkbox, etc.)
 * used in the defaults summary and review screens.
 *
 * This pipe handles the conversion of raw form values into user-friendly display strings,
 * with special formatting logic for each control type.
 *
 * @example
 * // In template with location:
 * {{ locationOption | summaryValueFormat }}
 * // Output: "Atlanta Georgia" (city and state combined)
 *
 * @example
 * // In template with range:
 * {{ ageRangeOption | summaryValueFormat }}
 * // Output: "18 - 65" (min - max format)
 *
 * @example
 * // In template with checkbox:
 * {{ checkboxOption | summaryValueFormat }}
 * // Output: "Yes" or "No"
 *
 * @example
 * // In template with other types:
 * {{ otherOption | summaryValueFormat }}
 * // Output: JSON stringified value
 */
@Pipe({
  name: 'summaryValueFormat',
})
export class SummaryValueFormatPipe implements PipeTransform {
  /**
   * Transforms a SummaryOption into a formatted display string based on its control type.
   *
   * @param opt - The summary option containing the control type and value to format
   * @returns A human-readable string representation of the option's value
   *
   * @example
   * // Location control
   * transform({ control: 'location', value: { city: 'Atlanta', state: 'Georgia' } })
   * // Returns: "Atlanta Georgia"
   *
   * @example
   * // Location with missing city
   * transform({ control: 'location', value: { city: '', state: 'Georgia' } })
   * // Returns: "Georgia"
   *
   * @example
   * // Range control
   * transform({ control: 'range', value: { min: 18, max: 65 } })
   * // Returns: "18 - 65"
   *
   * @example
   * // Checkbox control (true)
   * transform({ control: 'checkbox', value: true })
   * // Returns: "Yes"
   *
   * @example
   * // Checkbox control (false)
   * transform({ control: 'checkbox', value: false })
   * // Returns: "No"
   *
   * @example
   * // Other control types (weighting, concept, etc.)
   * transform({ control: 'weighting', value: { Male: 50, Female: 50 } })
   * // Returns: '{"Male":50,"Female":50}' (JSON stringified)
   */
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
