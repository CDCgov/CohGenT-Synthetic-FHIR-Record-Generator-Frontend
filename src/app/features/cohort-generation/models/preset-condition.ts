import {Concept} from './cohort-generation-request-body';

export interface PresetCondition {
  name: string;
  primaryCodes?: Concept[];
  secondaryCodes?: Concept[];
}
