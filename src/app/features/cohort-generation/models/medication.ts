/**
 * Represents a medication with its identifying concept and dosage information.
 * Used in medication form controls to capture medication data for cohort generation.
 *
 * This interface is used by the medication form primitive and medication helper service
 * to store medication information that will be included in medication sets for the
 * cohort generation request.
 */
export interface Medication {
  /**
   * Optional medical concept identifying the medication.
   * Contains standardized terminology information from systems like RxNorm.
   */
  concept?: {
    /** Human-readable display name of the medication (e.g., "Lisinopril 10mg Oral Tablet") */
    display: string;
    /** Terminology system identifier (e.g., "RxNorm") or system URI */
    system: string;
    /** Unique code identifying the medication within the system (e.g., "314076") */
    code: string;
  };

  /**
   * Dosage instruction as a string.
   * Describes how the medication should be administered.
   * @example "10mg once daily", "5mg twice daily with food"
   */
  dosage: string;
}
