import {Concept} from './cohort-generation-request-body';

class Onset {
  onsetPlus: number;
  units: 'years' | 'months' | 'weeks' | 'days';
  repeat?: boolean;
  repeatEvery?: number;
  repeatEveryUnits?: 'years' | 'months' | 'weeks' | 'days';

  constructor(data: any) {
    this.onsetPlus = data?.['onsetPlus']?.['value'];
    this.units = data?.['onsetPlus']?.['unit'];
    this.repeat = data?.['repeat'];
    if (this.repeat) {
      this.repeatEvery = data?.['every']?.['value'];
      this.repeatEveryUnits = data?.['every']?.['unit'];
    }
  }
}

interface LineItem {
  type: string;
  display: string;
  code: string;
  system: string;
  valueType: string;
  value: string;
}

export class EventSetDataView {
  eventSetTitle: string;
  lineItems: LineItem[];
  onset: Onset;
  diagnosticPanel?: Concept

  constructor(data: any) {
    this.eventSetTitle = "Placeholder title";
    this.lineItems = this.getLineItems(data);
    this.onset = new Onset(data.eventSetTiming);
    if (data.diagnosticPanel && data.diagnosticPanel.includeDiagnosticReport) {
      this.diagnosticPanel = data.diagnosticPanel.diagnosticReportConcept;
    }
  }

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
