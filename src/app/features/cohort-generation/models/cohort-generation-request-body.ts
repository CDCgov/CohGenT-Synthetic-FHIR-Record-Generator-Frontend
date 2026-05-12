import {CategoryTuple, Option, UseCase} from './use-case';
import {FormControl, FormGroup} from '@angular/forms';
import {UseCaseMetadata} from './use-case-metadata';
import {toDays} from '../../../shared/functions/time-to-days-conversion.function';
import {Utils} from '../services/utils.service';

export interface UserResponse {
  ruleId: string;
  value: any; //TODO add a more specific type for type handling
}

interface EventPeriod {
  start: string,
  end: string,
  until: string
}

export interface Concept {
  display: string;
  system: string;
  systemUri?: string;
  code: string;
}


export interface Medication {
  dosage: string;
  codeableConcept: Concept;
}

export class CohortGenerationRequestBody {
  useCaseId: string;
  count: number;
  userResponses: UserResponse[];
  seed: number;
  eventPeriod: EventPeriod;
  medications?: Medication[];
  eventSets?: any[];
  outputFormat: string;


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
          this.medications = this.getMedications(stepFg.get(['medication']));
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
          const controlValue = fg.controls[index].value;
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
    });

    return userResponses;
  }

  getMedications(fg: FormGroup): Medication[] {
    let medicationList: Medication[] = Object.keys(fg.controls).map(key => {
      let code = fg.get([key, 'concept', 'code'])!.value;
      const system = fg.get([key, 'concept', 'systemUri'])!.value || fg.get([key, 'concept', 'system'])!.value;
      const display = fg.get([key, 'concept', 'display'])!.value;
      const codeableConcept: Concept = {code: code, system: system, display: display}

      const dosage = fg.get([key, 'dosage'])!.value;
      return {codeableConcept: codeableConcept, dosage: dosage};
    });
    return medicationList;
  }

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

  private getEventSetTiming(eventSetTiming: any): any {
    const offset: number | null = toDays(eventSetTiming.onsetPlus?.unit, eventSetTiming.onsetPlus?.value);
    const repeat: boolean = eventSetTiming.repeat;
    if(!repeat){
      return { offset: offset, repeat: repeat }
    }
    const repeatTiming: number | null = toDays(eventSetTiming.every?.unit, eventSetTiming.every?.value);
    return {offset: offset, repeat: repeat, repeatTiming: repeatTiming}
  }

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
