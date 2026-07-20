import {Concept} from './cohort-generation-request-body';
import {Medication} from './medication';

/**
 * Represents a processed form rule ready for display in the review/summary view.
 * Transforms raw form rule data into a user-friendly format for presenting
 * the cohort configuration to users before generation.
 *
 * This interface is used in the review step to show users a summary of their
 * cohort configuration, including all form inputs and selections they've made.
 */
export interface ProcessedRule {
  /**
   * The order/position of this step in the multi-step form workflow.
   * Used to maintain the correct sequence when displaying the summary.
   */
  stepOrder: number;

  /**
   * Human-readable title of the form step.
   * @example "Demographics", "Medications", "Lab Results"
   */
  title: string;

  /**
   * Type of the form rule, indicating what kind of data it contains.
   * @example "custom", "medication", "additional-data-time-series"
   */
  type: string;

  /**
   * Optional generic data container for rule-specific information.
   * Structure varies based on the rule type.
   */
  data?: any;

  /**
   * Optional array of medications if this is a medication rule.
   * Contains the medication sets with their concepts and dosages.
   */
  medications?: Medication[];

  /**
   * Optional array of processed custom form options.
   * Contains user responses to custom form fields like checkboxes, ranges, weightings, etc.
   */
  customOptions?: ProcessedCustomOption[];

  /**
   * Optional range data for rules that involve numeric ranges.
   * Structure varies based on the specific range type.
   */
  rangeData?: any;
}

/**
 * Represents a processed custom form option ready for display.
 * Transforms raw form control values into human-readable display formats
 * for presenting user selections in the review/summary view.
 *
 * Different control types store their data in different optional properties
 * (weightedData, locationData, conceptData, timeRangeData) based on the
 * control type specified.
 */
export interface ProcessedCustomOption {
  /**
   * Unique identifier of the form rule this option corresponds to.
   * Links back to the original rule definition.
   */
  ruleId: string;

  /**
   * Human-readable label for the form field.
   * @example "Age Range", "Gender Distribution", "Primary Diagnosis"
   */
  label: string;

  /**
   * Type of form control used for this option.
   * @example "checkbox", "range", "weighting", "location", "concept", "relative-time-range"
   */
  control: string;

  /**
   * Human-readable string representation of the user's selection/input.
   * Formatted for display in the summary view.
   * @example "Yes", "18-65", "Male: 60%, Female: 40%", "Atlanta, GA"
   */
  displayValue: string;

  /**
   * Optional weighted data for weighting controls.
   * Contains key-value pairs showing the distribution of weights.
   * @example [{ key: "Male", value: 60 }, { key: "Female", value: 40 }]
   */
  weightedData?: { key: string; value: any }[];

  /**
   * Optional location data string for location controls.
   * Formatted location information (city and/or state).
   * @example "Atlanta, GA", "Georgia", "New York"
   */
  locationData?: string;

  /**
   * Optional concept data for concept controls.
   * Contains the selected medical concept with code, system, and display name.
   */
  conceptData?: Concept;

  /**
   * Optional time range data for relative-time-range controls.
   * Structure contains start and end time values with units.
   */
  timeRangeData?: any;
}
