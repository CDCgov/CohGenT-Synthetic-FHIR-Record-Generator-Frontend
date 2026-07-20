import {CategoryTuple, Option, UseCase} from './use-case';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {UseCaseMetadata} from './use-case-metadata';
import {toDays} from '../../../shared/functions/time-to-days-conversion.function';
import {Utils} from '../services/utils.service';

/**
 * Represents a user's response to a custom form field.
 * Maps a rule ID to the user-provided value for that rule.
 */
export interface UserResponse {
  /** The unique identifier of the form rule this response corresponds to */
  ruleId: string;
  /** The user-provided value. Type varies based on the control type (checkbox, range, weighting, etc.) */
  value: any; //TODO add a more specific type for type handling
}

/**
 * Defines the time period for cohort generation.
 */
interface EventPeriod {
  /** Start date of the cohort generation period */
  start: string,
  /** End date of the cohort generation period */
  end: string,
  /** Until date - the latest date for which data should be generated */
  until: string
}

/**
 * Represents a medical concept from a standardized terminology system (e.g., SNOMED, LOINC, RxNorm).
 * Used for medications, procedures, observations, and other clinical concepts.
 */
export interface Concept {
  /** Human-readable display name of the concept */
  display: string;
  /** Short name of the terminology system (e.g., "SNOMED", "LOINC") */
  system: string;
  /** Optional full URI of the terminology system (e.g., "http://snomed.info/sct") */
  systemUri?: string;
  /** The code identifying this concept within the system */
  code: string;
  /** Optional flag indicating if this concept has preset values available */
  hasPresets?: boolean;
  /** Optional domain classification of the concept (e.g., "Drug", "Procedure", "Measurment") */
  domain?: string
}

/**
 * Represents a list of medications with an associated probability weight.
 */
export interface MedicationSet{
  /** Probability weight (0-1 decimal) that a patient will receive this medication set */
  weight: number;
  /** Array of medications included in this set */
  medications: Medication[];
}

/**
 * Represents a single medication with its dosage and concept information.
 */
export interface Medication {
  /** Dosage instruction as a string (e.g., "10mg twice daily") */
  dosage: string;
  /** The medical concept identifying this medication */
  codeableConcept: Concept;
}

/**
 * Transforms hierarchical form data into the API request body format required by the backend.
 * Acts as a data transformation layer between the UI form structure and the cohort generation API.
 *
 * This class is instantiated in the Form Manager Component's onSubmit() method and performs
 * the following transformations:
 * - Converts percentage values to decimals
 * - Converts time ranges with units to total days
 * - Extracts and structures medication sets with weights
 * - Processes event sets with timing and entries
 * - Builds user responses from custom form fields
 *
 */
export class CohortGenerationRequestBody {
  /** Unique identifier of the selected use case */
  useCaseId: string;
  /** Number of synthetic patients to generate */
  count: number;
  /** Array of user responses to custom form fields */
  userResponses: UserResponse[];
  /** Random seed for reproducible cohort generation */
  seed: number;
  /** Time period configuration for the cohort */
  eventPeriod: EventPeriod;
  /** Optional array of medication sets with probability weights */
  medicationSets?: MedicationSet[];
  /** Optional array of event sets containing lab results, procedures, and radiology reports */
  eventSets?: any[];
  /** Desired output format (e.g., "FHIR", "CSV") */
  outputFormat: string;

  /**
   * Constructs a new CohortGenerationRequestBody by transforming form data into API format.
   *
   * @param form - The complete FormGroup containing all cohort generation form data
   * @param useCase - The use case definition with form rules and configuration
   * @param useCaseMetadata - Cohort metadata including name and time period (start, end, until)
   * @param units - Unit system for weights ("percent" for 0-100, "decimal" for 0-1)
   * @param utils - Utility service for helper functions like recursive form value extraction
   */
  constructor(form: any, useCase: UseCase, useCaseMetadata: UseCaseMetadata, units: "percent" | "decimal", private utils: Utils) {
    this.seed = form.get(['step_5', 'generate', 'seed']).value;
    this.outputFormat = form.get(['step_5', 'generate', 'outputFormat']).value;
    this.count = form.get(['step_5', 'generate', 'numberOfPatients', 'input']).value;
    this.eventPeriod = {
      "start": useCaseMetadata.start,
      "end": useCaseMetadata.end,
      "until": useCaseMetadata.until,
    };

    this.useCaseId = useCase.useCaseId;
    let userResponses: UserResponse[] = [];
    useCase.formRules.forEach(formRule => {
      Object.keys(form.controls).forEach((key) => {
        const stepFg = form.controls[key];
        if (stepFg.controls['medication'] && formRule.type === "medication") {
          this.medicationSets = this.getMedicationSets(stepFg.get(['medication']));
          // this.medications = this.getMedications(stepFg.get(['medication']));
        } else if (formRule.type === 'custom' && formRule?.options!.length > 0) {
          formRule.options!.forEach(option => {
            Object.keys(stepFg.controls).forEach(key => {
              const formGroup: FormGroup = stepFg.controls[key];
              if (key.indexOf('custom') != -1) {
                userResponses = userResponses.concat(this.getCustomFieldsResponses(formGroup, option, units));
              }
            });
          });
        } else if (stepFg.controls['additional-data-time-series'] && formRule.type === 'additional-data-time-series') {
          const eventSets = this.getEventSetsData(stepFg.get(['additional-data-time-series']));
          if (eventSets) {
            this.eventSets = eventSets;
          }
        }
      });
    });
    this.userResponses = userResponses;
  }

  /**
   * Transforms custom form field values into UserResponse objects based on control type.
   * Handles different control types: checkbox, range, weighting, location, concept,
   * relative-time-range, and tribal-affiliation.
   *
   * @param formGroup - The FormGroup containing the custom field controls
   * @param option - The option definition specifying the control type and configuration
   * @param units - Unit system for weight conversions ("percent" or "decimal")
   * @returns Array of UserResponse objects containing the transformed field values
   *
   * @private
   */
  private getCustomFieldsResponses(formGroup: FormGroup, option: Option, units: "percent" | "decimal"): UserResponse[] {
    const userResponses: UserResponse[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      if (key !== option.ruleId) return;

      if (option.control === 'checkbox') {
        const control = formGroup.get(key) as FormControl;
        const response: UserResponse = { ruleId: option.ruleId, value: control.value };
        userResponses.push(response);

      } else if (option.control === 'range') {
        const fg = formGroup.get(key) as FormGroup;
        const minValue = fg.controls['min'].value;
        const maxValue = fg.controls['max'].value;
        const response: UserResponse = {
          ruleId: option.ruleId,
          value: { min: minValue, max: maxValue }
        };
        userResponses.push(response);

      } else if (option.control === 'weighting') {
        const fg = formGroup.get(key) as FormGroup;

        const values = option.defaultValues.values.map((categoryTuple: CategoryTuple, index: number) => {
          const controlValue = fg.controls[index].getRawValue();
          let weightValue: number;

          // Check if the control value is an object (nested FormGroup)
          if (controlValue && typeof controlValue === 'object' && Object.keys(controlValue).length > 0) {
            weightValue = Number(Object.values(controlValue)[0]);
          } else {
            // Direct value
            weightValue = Number(controlValue);
          }

          // Convert from percent to decimal if needed
          const finalWeight = units === 'percent' ? weightValue / 100 : weightValue;

          return {
            value: categoryTuple.value,
            weight: finalWeight
          };
        });

        const response: UserResponse = {
          ruleId: option.ruleId,
          value: { values }
        };
        userResponses.push(response);

      } else if (option.control === 'location') {
        const fg = formGroup.get(key) as FormGroup;
        const value: { city?: string; state?: string } = {};

        if (fg.controls['city'].value) {
          value.city = fg.controls['city'].value;
        }
        if (fg.controls['state'].value) {
          value.state = fg.controls['state'].value?.abbreviation;
        }

        if (value.city || value.state) {
          const response: UserResponse = { ruleId: option.ruleId, value };
          userResponses.push(response);
        }

      } else if (option.control === 'concept') {
        const fg = formGroup.get(key) as FormGroup;
        const value: { code?: string; system?: string; display?: string } = {};

        value.code = fg.controls['code'].value;
        if (value.code) {
          // If code is not present, system urn is ignored
          value.system = fg.controls['systemUri'].value || fg.controls['system'].value;
        }
        value.display = fg.controls['display'].value;

        const response: UserResponse = {
          ruleId: option.ruleId,
          value: Object.values(value).some(v => v != null) ? value : null
        };
        userResponses.push(response);

      } else if (option.control === 'relative-time-range') {
        const fg = formGroup.get(key) as FormGroup;
        const startValue = fg.get(['start', 'value'])!.value;
        const endValue = fg.get(['end', 'value'])!.value;

        let startDaysCount = 0;
        let endDaysCount = 0;

        if (startValue > 0 && endValue > 0) {
          startDaysCount = toDays(fg.get(['start', 'unit'])!.value, startValue);
          endDaysCount = toDays(fg.get(['end', 'unit'])!.value, endValue);
        }

        const response: UserResponse = {
          ruleId: option.ruleId,
          value: { start: startDaysCount, end: endDaysCount }
        };
        userResponses.push(response);
      }
      else if(option.control === 'tribal-affiliation'){
        const fg = formGroup.get(key) as FormGroup;
        const prevalenceValue = fg.get(['prevalence', 'value'])!.value;
        const isRandomlyAssigned = fg.controls['isRandomlyAssigned'].value;

        const value: { prevalence: number; affiliationCode?: string } = {
          prevalence: units === 'percent' ? prevalenceValue / 100 : prevalenceValue
        };

        // Only include affiliationCode if a specific affiliation is selected
        if (!isRandomlyAssigned && fg.controls['affiliation'].value) {
          value.affiliationCode = fg.controls['affiliation'].value.code;
        }

        const response: UserResponse = {
          ruleId: option.ruleId,
          value: value
        };
        userResponses.push(response);
      }
      else if (option.control === 'occupation'){
        const fg = formGroup.get(key) as FormGroup;
        const isRandomlyAssigned = fg.controls['isRandomlyAssigned'].value;
        let value: { occupationCode: string | null } = { occupationCode: null };

        if (!isRandomlyAssigned && fg.controls['occupationConcept'].value) {
          value = { occupationCode: fg.controls['occupationConcept'].value.code };
        }

        const response: UserResponse = {
          ruleId: option.ruleId,
          value: value
        };
        userResponses.push(response);
      }
    });

    return userResponses;
  }


  /**
   * Transforms medication FormArray into structured MedicationSet objects.
   * Converts weight percentages to decimals and extracts medication details.
   *
   * @param fgArray - FormArray containing medication set form groups
   * @returns Array of MedicationSet objects with weights and medications
   *
   * @private
   */
  private getMedicationSets(fgArray: FormArray): MedicationSet[] {
    return fgArray.controls.map(fgGroup => {
      // Get the weight value and convert from percentage to decimal
      const weight = (fgGroup.get(['weightFg', 'weight'])?.value ?? 0) / 100;

      // Get the medications FormArray from this medication set
      const medicationsFormArray = fgGroup.get('medications') as FormArray;

      // Convert the medications FormArray to Medication[] using helper method
      const medications = this.getMedications(medicationsFormArray);

      return { medications, weight };
    });
  }

  /**
   * Extracts medication details from a FormArray of medication controls.
   * Builds Medication objects with concept information and dosage.
   *
   * @param medicationsArray - FormArray containing individual medication form controls
   * @returns Array of Medication objects with concept and dosage information
   *
   * @private
   */
  private getMedications(medicationsArray: FormArray): Medication[] {
    return medicationsArray.controls.map(medicationControl => {
      const code = medicationControl.get(['concept', 'code'])?.value;
      const system = medicationControl.get(['concept', 'systemUri'])?.value ||
                     medicationControl.get(['concept', 'system'])?.value;
      const display = medicationControl.get(['concept', 'display'])?.value;
      const dosage = medicationControl.get('dosage')?.value;

      const codeableConcept: Concept = { code, system, display };
      return { codeableConcept, dosage };
    });
  }

  /**
   * Processes event sets data including lab observations, procedures, and radiology reports.
   * Extracts raw form values (including disabled controls) and structures them for the API.
   *
   * @param fg - FormGroup containing event sets data
   * @returns Array of event set objects with timing, entries, and diagnostic report information
   *
   * @private
   */
  private getEventSetsData(fg: FormGroup) {
    // Extract raw values including disabled controls
    //TODO : Consider refactoring the code so the whole form value is extracted with the line below.
    // This way the value of all disabled fields in the future will be extracted
    const rawValue = this.utils.getFormRawValueRecursive(fg);

    return rawValue.map((value: any, index: number) => {
      return {
        name: `Event ${index}`,
        timing: this.getEventSetTiming(value.eventSetTiming),
        includeDiagnosticReport: value?.diagnosticPanel?.includeDiagnosticReport,
        entry: this.getEventSetEntries(value),
        ...(value?.diagnosticPanel?.includeDiagnosticReport && {
          diagnosticReportConcept: value.diagnosticPanel.diagnosticReportConcept
        })
      };
    });
  }
  /**
   * Extracts and transforms event set timing information.
   * Converts time values with units to days and handles repeat configurations.
   *
   * @param eventSetTiming - Raw timing data from the form
   * @returns Timing object with offset, repeat flag, repeatTiming, and until values in days
   *
   * @private
   */
  private getEventSetTiming(eventSetTiming: any): any {

    const offset: number | null = toDays(eventSetTiming.onsetPlusFg?.unit, eventSetTiming.onsetPlusFg?.value);
    const repeat: boolean = eventSetTiming.repeatFg.repeat;
    if(!repeat){
      return { offset: offset, repeat: repeat };
    }

    const repeatTiming: number | null = toDays(eventSetTiming.repeatFg.every?.unit, eventSetTiming.repeatFg.every?.value);
    let untilTiming: number | null = null;
    if (eventSetTiming.untilFg.endFor.toLowerCase() === 'for') {
      untilTiming = toDays(eventSetTiming.untilFg?.unit, eventSetTiming.untilFg?.value);
    }
    return {offset: offset, repeat: repeat, repeatTiming: repeatTiming, until: untilTiming};
  }

  /**
   * Builds event set entries from lab observations, procedures, and radiology reports.
   * Each entry includes a type and associated concept information.
   *
   * @param value - Raw event set data containing labObservations, procedures, and radiologyList
   * @returns Array of entry objects with type, codeableConcept, and optional value
   *
   * @private
   */
  private getEventSetEntries(value: any): any {
    const entry: any[] = [];

    if (value.labObservations?.length > 0) {
      value.labObservations.forEach((labObservation: any) => {
        entry.push({
          type: 'labResult',
          codeableConcept: labObservation.labResultConcept,
          value: this.getValue(labObservation.value)
        });
      });
    }

    if (value.procedures?.length > 0) {
      value.procedures.forEach((procedure: any) => {
        entry.push({
          type: 'procedure',
          codeableConcept: procedure.procedureConcept,
        });
      });
    }

    if (value.radiologyList?.length > 0) {
      value.radiologyList.forEach((radiologyReport: any) => {
        entry.push({
          type: 'radiology',
          codeableConcept: radiologyReport.radiologyConcept,
        });
      });
    }

    return entry;
  }

  /**
   * Transforms lab observation values based on their type (string or quantity).
   * For string types, returns value/weight pairs. For quantity types, returns min/max/unit.
   *
   * @param value - Raw value data with valueType and valueArray
   * @returns Transformed value object or null if valueType is unrecognized
   *
   * @private
   */
  private getValue(value: any) {
    if (value.valueType === 'string') {
      const valueWeights = value.valueArray.map((el: any) => {
        return {'value': el.value, 'weight': el.weight};
      });
      return {'values': valueWeights};
    } else if (value.valueType === 'quantity') {
      const result = value.valueArray.map((el: any) => {
        const result = {
          min: el.min,
          max: el.max,
          unit: el.unit
        }
        return result;
      });
      return result[0];
    }
    return null;
  }

}
