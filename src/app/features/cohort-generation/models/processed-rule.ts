
import {Concept} from './cohort-generation-request-body';

export interface ProcessedRule {
  stepOrder: number;
  title: string;
  type: string;
  data?: any;
  medications?: Medication[];
  customOptions?: ProcessedCustomOption[];
  rangeData?: any;
}

export interface ProcessedCustomOption {
  ruleId: string;
  label: string;
  control: string;
  displayValue: string;
  weightedData?: { key: string; value: any }[];
  locationData?: string;
  conceptData?: Concept;
  timeRangeData?: any;
}
