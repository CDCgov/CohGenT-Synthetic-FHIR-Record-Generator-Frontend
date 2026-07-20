/**
 * Represents a geographic location with optional state and city information.
 * Used in location-based form controls to capture patient location data.
 *
 * This interface is used by the location form primitive component to store
 * user-selected location information, which can then be included in cohort
 * generation requests.
 */
interface Location {
  /**
   * Optional state information.
   * Contains both the full state name and its two-letter abbreviation.
   */
  state?: {
    /** Full name of the state (e.g., "Georgia") */
    name?: string;
    /** Two-letter state abbreviation (e.g., "GA") */
    abbreviation?: string;
  };

  /**
   * Optional city name (e.g., "Atlanta").
   * Can be specified independently of state.
   */
  city?: string;
}
