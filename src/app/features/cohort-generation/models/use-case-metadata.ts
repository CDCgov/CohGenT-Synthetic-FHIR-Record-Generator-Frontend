/**
 * Represents metadata for a cohort generation use case.
 * Contains temporal boundaries and identification information for the cohort being generated.
 *
 * This metadata is collected in the cohort info step and used throughout the generation
 * process to define the time period and naming for the cohort.
 */
export interface UseCaseMetadata {
  /**
   * Start date for the cohort observation period.
   */
  start: string;

  /**
   * End date for the cohort observation period.
   */
  end: string;

  /**
   * "Until" date defining the data availability cutoff.
   * Represents the latest date for which data is available in the system.
   */
  until: string;

  /**
   * User-defined name for the cohort.
   * Used to identify and label the generated cohort in the system.
   * @example "Type 2 Diabetes Study 2020-2023", "Hypertension Cohort Q1 2024"
   */
  cohortName: string;
}
