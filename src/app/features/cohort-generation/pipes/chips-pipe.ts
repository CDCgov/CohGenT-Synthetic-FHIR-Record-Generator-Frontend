import { Pipe, PipeTransform } from '@angular/core';

/**
 * Mapping of tag keys to their human-readable display labels.
 * Used to convert internal tag identifiers to user-friendly text for chip display.
 */
const TAGS = {
  /** Tag indicating a form field is optional */
  optional: "Optional",
  /** Tag indicating a form field is required */
  required: "Required",
  /** Tag indicating a form field has default values */
  default: "Has Defaults"
} as const;

/**
 * Type representing valid tag keys from the TAGS constant.
 */
type TagKey = keyof typeof TAGS;

/**
 * Angular pipe that transforms tag keys into human-readable chip labels.
 * Used in templates to display form option tags as Material chips with
 * user-friendly text.
 *
 * This pipe is commonly used in form option displays to show metadata
 * about form fields (whether they're optional, required, or have defaults).
 *
 * @example
 * // In template:
 * {{ 'optional' | chipsStr }}  // Output: "Optional"
 * {{ 'required' | chipsStr }}  // Output: "Required"
 * {{ 'default' | chipsStr }}   // Output: "Has Defaults"
 * {{ 'unknown' | chipsStr }}   // Output: null
 */
@Pipe({
  name: 'chipsStr',
  standalone: true
})
export class ChipsPipe implements PipeTransform {

  /**
   * Transforms a tag key into its human-readable display label.
   *
   * @param value - The tag key to transform (e.g., "optional", "required", "default")
   * @returns The human-readable label for the tag, or null if the tag is not recognized
   *
   * @example
   * transform('optional')  // Returns: "Optional"
   * transform('required')  // Returns: "Required"
   * transform('default')   // Returns: "Has Defaults"
   * transform('invalid')   // Returns: null
   */
  transform(value: string): string {
    if (value in TAGS) {
      return TAGS[value as TagKey];
    }
    return null;
  }

}
