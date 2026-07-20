/**
 * Represents a navigation link to related entities or actions.
 * Used to provide contextual navigation from form options to related resources.
 */
export interface Link {
  /** The action to perform when the link is clicked (e.g., "navigate", "open") */
  action: string;
  /** Unique identifier of the entity being linked to */
  entityId: string;
  /** Navigation path or URL for the link */
  path: string;
}

/**
 * Represents a category with an associated weight value.
 * Used in weighting controls to define distribution categories and their default weights.
 * @example { value: "Male", weight: 50 }, { value: "Female", weight: 50 }
 */
export interface CategoryTuple {
  /** The category name or label */
  value: string;
  /** The weight/percentage assigned to this category (typically 0-100) */
  weight: number;
}

/**
 * Base interface containing common properties shared by all form option types.
 * Extended by specific option interfaces (WeightingOption, RangeOption, etc.)
 * to provide type-safe form control configurations.
 */
interface BaseOption {
  /** Unique identifier for this form rule/option */
  ruleId: string;
  /** Human-readable label displayed to the user */
  label: string;
  /** Optional additional notes or help text */
  notes?: string;
  /** Optional link to related entities or documentation */
  link?: Link;
  /** Optional default state for checkbox controls */
  defaultState?: boolean;
  /** Optional action identifier for special behaviors */
  action?: string;
  /** Optional tooltip text shown on hover */
  tooltip?: string;
  /** Optional detailed description of the option */
  description?: string;
  /** Optional tags indicating option characteristics (optional, default, required, enable-preset-condition) */
  tags?: ("optional" | "default" | "required" | 'enable-preset-condition')[];
}

/**
 * Form option for weighting/distribution controls.
 * Allows users to specify percentage distributions across multiple categories.
 * @example Gender distribution: Male 60%, Female 40%
 */
export interface WeightingOption extends BaseOption {
  control: "weighting";
  /** Default category values with their initial weights */
  defaultValues: {
    values: CategoryTuple[];
  };
  /** Optional array of category names */
  values?: string[];
  /** Number of decimal places allowed in weight values */
  decimalSpacesAllowed?: number;
  minMax?: null;
  negativesAllowed?: never;
}

/**
 * Form option for tribal affiliation prevalence control.
 * Allows users to specify the prevalence of tribal affiliation in the cohort.
 */
export interface TribalAffiliationOption extends BaseOption {
  control: "tribal-affiliation";
  /** Default prevalence value (0-100) */
  defaultValues: { prevalence : number};
  minMax: never;
  /** Whether decimal values are allowed */
  decimalSpacesAllowed?: boolean;
  /** Whether negative values are allowed */
  negativesAllowed?: boolean;
  values?: never;
}

/**
 * Form option for occupation selection controls.
 * Allows users to specify patient occupation.
 */
export interface OccupationOption extends BaseOption {
  control: "occupation";
  /** Default location values */
  defaultValues?: { occupationCode: string };
  /** Available location values */
  values?: string[];
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

/**
 * Form option for numeric range controls.
 * Allows users to specify a min-max range for values like age, lab results, etc.
 * @example Age range: [18, 65]
 */
export interface RangeOption extends BaseOption {
  control: "range";
  /** Default [min, max] values */
  defaultValues: [number, number];
  /** Allowed [min, max] boundaries for the range */
  minMax: [number, number];
  /** Whether decimal values are allowed */
  decimalSpacesAllowed?: boolean;
  /** Whether negative values are allowed */
  negativesAllowed?: boolean;
  values?: never;
}

/**
 * Form option for checkbox controls.
 * Allows users to toggle a boolean option on/off.
 * @example "Include patients with diabetes": true/false
 */
export interface CheckboxOption extends BaseOption {
  control: "checkbox";
  /** Default checked state */
  defaultValues?: boolean;
  values?: never;
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

/**
 * Form option for medical concept selection controls.
 * Allows users to search and select standardized medical concepts (diagnoses, procedures, etc.).
 */
export interface ConceptOption extends BaseOption {
  control: "concept";
  /** Default concept codes or IDs */
  defaultValues?: string[] | number[];
  /** Available concept codes or IDs */
  values?: string[] | number[];
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

/**
 * Form option for location selection controls.
 * Allows users to specify geographic locations (city, state).
 */
export interface LocationOption extends BaseOption {
  control: "location";
  /** Default location values */
  defaultValues?: string[];
  /** Available location values */
  values?: string[];
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

/**
 * Form option for relative time range controls.
 * Allows users to specify time ranges relative to an index date.
 * @example "30 days before to 90 days after diagnosis"
 */
export interface RelativeTimeRangeOption extends BaseOption {
  control: "relative-time-range";
  /** Default start and end time values (in days) */
  defaultValues: {
    start: number;
    end: number;
  };
  /** Optional [min, max] boundaries for time values */
  minMax?: [number, number];
  /** Whether decimal values are allowed */
  decimalSpacesAllowed?: boolean;
  /** Whether negative values are allowed (for "before" dates) */
  negativesAllowed?: boolean;
  values?: never;
}

/**
 * Form option for other/custom control types not covered by specific interfaces.
 * Provides flexibility for future control types.
 */
export interface OtherOption extends BaseOption {
  control: "other";
  defaultValues?: unknown;
  values?: unknown;
  minMax?: unknown;
  decimalSpacesAllowed?: unknown;
  negativesAllowed?: unknown;
}

/**
 * Form option for prevalence controls.
 * Allows users to specify the prevalence/percentage of a condition in the cohort.
 * @example "Diabetes prevalence: 25%"
 */
export interface PrevalenceOption extends BaseOption {
  control: "prevalence";
  /** Default prevalence value (0-100) */
  defaultValues: number;
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
  values?: never;
}

/**
 * Union type representing all possible form option types.
 * Provides type-safe discrimination based on the 'control' property.
 * Used throughout the application to handle different form control configurations.
 */
export type Option =
  | WeightingOption
  | RangeOption
  | CheckboxOption
  | ConceptOption
  | LocationOption
  | RelativeTimeRangeOption
  | TribalAffiliationOption
  | PrevalenceOption
  | OccupationOption
  | OtherOption;

/**
 * Represents a form rule defining a step in the multi-step cohort generation workflow.
 * Each form rule corresponds to one step in the stepper and contains the configuration
 * for all form controls displayed in that step.
 */
export interface FormRule {
  /** Type of form rule (e.g., "custom", "medication", "additional-data-time-series") */
  type: string;
  /** Order/position of this step in the workflow (0-based) */
  stepOrder: number;
  /** Human-readable title displayed in the stepper and step header */
  title: string;
  /** Optional array of form options/controls for this step */
  options?: Option[];
  /** Description text explaining the purpose of this step */
  description: string;
}

/**
 * Represents an additional entity type that can be added to the cohort configuration.
 * Additional entities are typically time-series data like lab results, vital signs, etc.
 * that users can add multiple instances of (event sets).
 */
export interface AdditionalEntity {
  /** Unique identifier for this entity type */
  entityId: string;
  /** Type classification of the entity (e.g., "time-series", "observation") */
  type: string;
  /** Label displayed on the button to add this entity */
  buttonLabel: string;
  /** Filename of the JSON configuration file defining this entity's structure */
  entityFile: string;
  /** Default terminology system for concepts in this entity (e.g., "LOINC", "SNOMED") */
  defaultSystem: string;
}

/**
 * Represents common entities that can be included in any use case.
 * Provides configuration for medications and additional data entities.
 */
export interface CommonEntities {
  /** Optional medication entity identifier (if medications are supported in this use case) */
  medication?: string;
  /** Optional array of additional entity configurations (lab results, vital signs, etc.) */
  additionalEntities?: AdditionalEntity[];
}

/**
 * Represents a complete use case configuration for cohort generation.
 * A use case defines the entire multi-step workflow, including all form rules,
 * entities, and generation rules needed to create a specific type of cohort.
 *
 * Use cases are loaded from JSON configuration files and drive the dynamic
 * form generation process.
 *
 * @example "Type 2 Diabetes Cohort", "Hypertension Study Cohort"
 */
export interface UseCase {
  /** Unique identifier for this use case */
  useCaseId: string;
  /** Human-readable title of the use case */
  title: string;
  /** Map of generation rule identifiers to their configurations */
  generationRules: { [key: string]: string };
  /** Array of entity configurations (currently unused but present in the API) */
  entities: any[];
  /** Common entities configuration (medications, additional data) */
  commonEntities: CommonEntities;
  /** Detailed description of the use case and its purpose */
  description: string;
  /** Array of form rules defining each step in the workflow */
  formRules: FormRule[];
}
