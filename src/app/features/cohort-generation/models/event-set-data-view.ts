import {Concept} from './cohort-generation-request-body';

/**
 * Represents the timing configuration for when an event set occurs.
 * Includes the initial onset timing and optional repeat configuration.
 */
class Onset {
  /** Number of time units after the cohort start when the event occurs */
  onsetPlus: number;
  /** Time unit for the onset offset (years, months, weeks, or days) */
  units: 'years' | 'months' | 'weeks' | 'days';
  /** Optional flag indicating if the event repeats */
  repeat?: boolean;
  /** Optional number of time units between repetitions */
  repeatEvery?: number;
  /** Optional time unit for the repeat interval */
  repeatEveryUnits?: 'years' | 'months' | 'weeks' | 'days';
  /** Optional indicator of whether the repeat ends at a specific time or after a duration */
  endFor?: 'End' | 'For';
  /** Optional value for the until/for duration */
  untilValue?: number;
  /** Optional time unit for the until/for duration */
  untilUnit?: 'years' | 'months' | 'weeks' | 'days';

  /**
   * Constructs an Onset object from raw form data.
   * Extracts timing information from nested form group structure.
   *
   * @param data - Raw form data containing onsetPlusFg, repeatFg, and untilFg
   */
  constructor(data: any) {
    // Extract onsetPlus from onsetPlusFg
    this.onsetPlus = data?.['onsetPlusFg']?.['value'];
    this.units = data?.['onsetPlusFg']?.['unit'];

    // Extract repeat from repeatFg
    this.repeat = data?.['repeatFg']?.['repeat'];

    if (this.repeat) {
      // Extract every from repeatFg.every
      this.repeatEvery = data?.['repeatFg']?.['every']?.['value'];
      this.repeatEveryUnits = data?.['repeatFg']?.['every']?.['unit'];

      // Extract until information from untilFg
      this.endFor = data?.['untilFg']?.['endFor'];
      this.untilValue = data?.['untilFg']?.['value'];
      this.untilUnit = data?.['untilFg']?.['unit'];
    }
  }
}

/**
 * Represents a single line item in an event set display.
 * Can be a procedure, lab observation, or radiology report.
 */
interface LineItem {
  /** Type of the line item (e.g., "Procedure", "Lab Observation", "Radiology Report") */
  type: string;
  /** Human-readable display name of the concept */
  display: string;
  /** Unique code identifying the concept */
  code: string;
  /** Terminology system (e.g., "SNOMED", "LOINC") or system URI */
  system: string;
  /** Type of value for lab observations ("string", "quantity", or "N/A" for procedures/radiology) */
  valueType: string;
  /** Formatted value string for display (e.g., "Normal: 60%, Abnormal: 40%" or "Min: 10 Max: 20 Unit: mg/dL") */
  value: string;
}

/**
 * View model for displaying event set data to users.
 * Transforms raw form data into a user-friendly format for rendering in the UI.
 *
 * This class is used to present event set information in a readable format,
 * including timing, procedures, lab observations, radiology reports, and diagnostic panels.
 *
 * @example
 * ```typescript
 * const eventSetView = new EventSetDataView(formData);
 * // Display eventSetView.lineItems in a table
 * // Show eventSetView.onset timing information
 * ```
 */
export class EventSetDataView {
  /** Title for the event set display */
  eventSetTitle: string;
  /** Array of line items representing procedures, lab observations, and radiology reports */
  lineItems: LineItem[];
  /** Timing configuration for when the event set occurs */
  onset: Onset;
  /** Optional diagnostic panel concept if a diagnostic report is included */
  diagnosticPanel?: Concept

  /**
   * Constructs an EventSetDataView from raw form data.
   * Transforms nested form structure into a flat, display-friendly format.
   *
   * @param data - Raw form data containing procedures, labObservations, radiologyList,
   *               eventSetTiming, and optional diagnosticPanel
   */
  constructor(data: any) {
    this.eventSetTitle = "Placeholder title";
    this.lineItems = this.getLineItems(data);
    this.onset = new Onset(data.eventSetTiming);
    if (data.diagnosticPanel && data.diagnosticPanel.includeDiagnosticReport) {
      this.diagnosticPanel = data.diagnosticPanel.diagnosticReportConcept;
    }
  }

  /**
   * Extracts and transforms line items from raw form data.
   * Processes procedures, lab observations, and radiology reports into a unified format.
   *
   * @param data - Raw form data containing procedures, labObservations, and radiologyList arrays
   * @returns Array of LineItem objects ready for display
   *
   * @private
   */
  private getLineItems(data: any): LineItem[] {
    const lineItems: LineItem[] = [];
    // Handle procedures
    if (data?.procedures?.length > 0) {
      data.procedures.forEach((item: any) => {
        const lineItem: LineItem = {
          type: 'Procedure',
          display: item?.procedureConcept?.display,
          code: item?.procedureConcept?.code,
          system: item?.procedureConcept?.system == 'other' ? item.procedureConcept.systemUri : item.procedureConcept?.system,
          valueType: 'N/A',
          value: 'N/A',
        }
        lineItems.push(lineItem);
      });
    }

    // Handle lab observations - now an array
    if (data?.labObservations?.length > 0) {
      data.labObservations.forEach((item: any) => {
        const lineItem: LineItem = {
          type: 'Lab Observation',
          display: item?.labResultConcept?.display,
          code: item?.labResultConcept?.code,
          system: item?.labResultConcept?.system == 'other' ? item.labResultConcept.systemUri : item.labResultConcept?.system,
          valueType: item?.value?.valueType,
          value: this.getValueStr(item),
        }
        lineItems.push(lineItem);
      });
    }

    if (data?.radiologyList?.length > 0) {
      data.radiologyList.forEach((item: any) => {
        const lineItem: LineItem = {
          type: 'Radiology Report',
          display: item?.radiologyConcept?.display,
          code: item?.radiologyConcept?.code,
          system: item?.radiologyConcept?.system == 'other' ? item.radiologyConcept.systemUri : item.radiologyConcept?.system,
          valueType: 'N/A',
          value: 'N/A',
        }
        lineItems.push(lineItem);
      });
    }

    return lineItems;
  }

  /**
   * Formats lab observation values into a human-readable string.
   * Handles both string values (with weights) and quantity values (with min/max/unit).
   *
   * @param item - Lab observation item with value.valueType and value.valueArray
   * @returns Formatted string representation of the value(s)
   *          - For string type: "Normal: 60%, Abnormal: 40%"
   *          - For quantity type: "Min: 10 Max: 20 Unit: mg/dL"
   *
   * @private
   */
  private getValueStr(item: any): string {
    if (!item || !item?.value?.valueType || !item.value?.valueArray?.length) {
      return '';
    }
    let resultStr = '';
    if (item.value.valueType == 'string') {
      resultStr = item.value.valueArray.map((el: any) => {
        if(el.value) {
          let mapped = `${el.value}: ${el.weight}%`;
          return mapped;
        }
        else return '';
      }).join(', ');
    } else if (item.value.valueType == 'quantity') {
      resultStr = item.value.valueArray.map((el: any) => `Min: ${el.min ?? ''} Max: ${el.max ?? ''} Unit: ${el.unit ?? ''}`).join(', ');
    }
    return resultStr;
  }
}
