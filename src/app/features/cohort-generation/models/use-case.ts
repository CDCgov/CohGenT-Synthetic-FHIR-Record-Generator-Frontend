export interface Link {
  action: string;
  entityId: string;
  path: string;
}

export interface CategoryTuple {
  value: string;
  weight: number;
}

// Base interface with common properties
interface BaseOption {
  ruleId: string;
  label: string;
  notes?: string;
  link?: Link;
  defaultState?: boolean;
  action?: string;
  tooltip?: string;
  description?: string;
  tags?: ("optional" | "default" | "required" | 'enable-preset-condition')[];
}

// Specific option types based on control type
export interface WeightingOption extends BaseOption {
  control: "weighting";
  defaultValues: {
    values: CategoryTuple[];
  };
  values?: string[];
  decimalSpacesAllowed?: number;
  minMax?: null;
  negativesAllowed?: never;
}

export interface TribalAffiliationOption extends BaseOption {
  control: "tribal-affiliation";
  defaultValues: { prevalence : number};
  minMax: never;
  decimalSpacesAllowed?: boolean;
  negativesAllowed?: boolean;
  values?: never;
}

export interface RangeOption extends BaseOption {
  control: "range";
  defaultValues: [number, number];
  minMax: [number, number];
  decimalSpacesAllowed?: boolean;
  negativesAllowed?: boolean;
  values?: never;
}

export interface CheckboxOption extends BaseOption {
  control: "checkbox";
  defaultValues?: boolean;
  values?: never;
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

export interface ConceptOption extends BaseOption {
  control: "concept";
  defaultValues?: string[] | number[];
  values?: string[] | number[];
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

export interface LocationOption extends BaseOption {
  control: "location";
  defaultValues?: string[];
  values?: string[];
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
}

export interface RelativeTimeRangeOption extends BaseOption {
  control: "relative-time-range";
  defaultValues: {
    start: number;
    end: number;
  };
  minMax?: [number, number];
  decimalSpacesAllowed?: boolean;
  negativesAllowed?: boolean;
  values?: never;
}

export interface OtherOption extends BaseOption {
  control: "other";
  defaultValues?: unknown;
  values?: unknown;
  minMax?: unknown;
  decimalSpacesAllowed?: unknown;
  negativesAllowed?: unknown;
}

export interface PrevalenceOption extends BaseOption {
  control: "prevalence";
  defaultValues: number;
  minMax?: never;
  decimalSpacesAllowed?: never;
  negativesAllowed?: never;
  values?: never;
}

// Union type for all options (this replaces your Option interface)
export type Option =
  | WeightingOption
  | RangeOption
  | CheckboxOption
  | ConceptOption
  | LocationOption
  | RelativeTimeRangeOption
  | TribalAffiliationOption
  | PrevalenceOption
  | OtherOption;

export interface FormRule {
  type: string;
  stepOrder: number;
  title: string;
  options?: Option[];
  description: string;
}

export interface AdditionalEntity {
  entityId: string;
  type: string;
  buttonLabel: string;
  entityFile: string;
  defaultSystem: string;
}

export interface CommonEntities {
  medication?: string;
  additionalEntities?: AdditionalEntity[];
}

export interface UseCase {
  useCaseId: string;
  title: string;
  generationRules: { [key: string]: string };
  entities: any[];
  commonEntities: CommonEntities;
  description: string;
  formRules: FormRule[];
}
