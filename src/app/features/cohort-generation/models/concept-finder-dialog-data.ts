/**
 * Configuration data passed to the Concept Finder Dialog modal.
 * This interface defines the initial state and behavior of the concept search dialog,
 * which allows users to search for and select medical concepts from standardized
 * terminology systems (e.g., SNOMED, LOINC, RxNorm).
 */
interface ConceptFinderDialogData {
  /**
   * Indicates whether the dialog was opened from a preset concept selection.
   */
  fromPreset: boolean;

  /**
   * Optional list of available terminology systems to search within.
   * Each system has a human-readable label and an optional URI.
   * Examples: [{ label: "SNOMED CT", uri: "http://snomed.info/sct" }]
   */
  systemList?: { label: string; uri: string | null }[];

  /**
   * Optional pre-selected terminology system to use as the default search context.
   * When provided, the dialog will initialize with this system selected.
   */
  selectedSystem?: { label: string; uri: string | null };

  /**
   * Optional hint text to display in the search input field.
   * Provides guidance to users about what to search for (e.g., "Search for medications...").
   */
  searchTermHint?: string;

  /**
   * Optional flag indicating whether preset concepts have been rendered in the dialog.
   * Used to track the state of preset concept display and avoid duplicate rendering.
   */
  hasPresetsRendered?: boolean;
}
