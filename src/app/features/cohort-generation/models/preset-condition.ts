import {Concept} from './cohort-generation-request-body';

/**
 * Represents a predefined medical condition with associated diagnostic codes.
 * Used to provide users with preset condition options that include commonly used
 * primary and secondary diagnostic codes from standardized terminology systems.
 *
 * Preset conditions simplify the cohort generation process by offering pre-configured
 * sets of medical concepts that users can select instead of manually searching for
 * individual codes.
 */
export interface PresetCondition {
  /**
   * Human-readable name of the condition.
   */
  name: string;

  /**
   * Optional array of primary diagnostic codes for the condition.
   * Primary codes represent the main diagnosis or condition being treated.
   * Each concept includes the code, system (e.g., ICD-10, SNOMED), and display name.
   */
  primaryCodes?: Concept[];

  /**
   * Optional array of secondary diagnostic codes related to the condition.
   * Secondary codes represent complications, comorbidities, or related conditions
   * that often occur alongside the primary diagnosis.
   */
  secondaryCodes?: Concept[];
}
