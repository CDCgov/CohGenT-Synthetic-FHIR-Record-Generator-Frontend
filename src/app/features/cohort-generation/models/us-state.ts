/**
 * Represents a United States state with its full name and two-letter abbreviation.
 * Used in location form controls to provide state selection options and store
 * state information for cohort generation.
 *
 * This interface is typically used with a predefined list of all US states
 * (stored in app constants) to populate dropdown menus and validate state selections.
 */
export interface UsState {
  /**
   * Full name of the US state.
   * @example "Georgia", "California", "New York"
   */
  name: string;

  /**
   * Two-letter state abbreviation (postal code).
   * @example "GA", "CA", "NY"
   */
  abbreviation: string;
}
