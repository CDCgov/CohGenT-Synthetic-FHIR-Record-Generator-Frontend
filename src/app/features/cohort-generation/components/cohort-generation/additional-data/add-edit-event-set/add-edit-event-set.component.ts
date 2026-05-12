import {AfterViewChecked, Component, computed, ElementRef, inject, input, output, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from '@angular/material/select';
import {ConceptFormComponent} from '../../simple-forms/concept-form/concept-form.component';
import {MatCardModule} from '@angular/material/card';
import {AdditionalDataHelperService} from '../../../../services/form-helpers/additional-data-helper.service';
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {OnsetTimeRangeComponent} from '../../simple-forms/onset-time-range/onset-time-range.component';
import {AsFormGroupPipe} from '../../../../../../shared/pipes/as-form-group-pipe';
import {SimpleWeightingFormArray} from '../../simple-forms/simple-weighting-form-array/simple-weighting-form-array';
import {PresetLabObservationValue} from '../../../../services/preset-lab-observation-values.service';
import {MatDivider} from '@angular/material/list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatTooltip} from '@angular/material/tooltip';
import {Utils} from '../../../../services/utils.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {UNITS_OF_MEASURE} from '../../../../../../constants/units_of_measure';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {map, Observable, startWith} from 'rxjs';


@Component({
  selector: 'app-add-edit-event-set',
  imports: [
    ConceptFormComponent,
    FormsModule,
    MatButton,
    MatCardModule,
    MatFormField,
    MatIcon,
    MatMiniFabButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    OnsetTimeRangeComponent,
    AsFormGroupPipe,
    SimpleWeightingFormArray,
    MatDivider,
    MatProgressSpinner,
    MatCheckbox,
    MatTooltip,
    MatError,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe,
  ],
  templateUrl: './add-edit-event-set.component.html',
  styleUrl: './add-edit-event-set.component.scss'
})
export class AddEditEventSetComponent implements AfterViewChecked {
  @ViewChild('proceduresContainer') proceduresContainer?: ElementRef;
  @ViewChild('radiologyContainer') radiologyContainer?: ElementRef;
  @ViewChild('labObservationsContainer') labObservationsContainer?: ElementRef;

  additionalDataFg = input.required<FormGroup>();
  index = input<number>(0);

  additionalDataHelperSeries = inject(AdditionalDataHelperService);

  private shouldScrollToProcedures = false;
  private shouldScrollToRadiology = false;
  private shouldScrollToLabObservations = false;

  labObservationButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'labResult');
    return labResult?.buttonLabel ?? '';
  });

  procedureButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'procedure');
    return labResult?.buttonLabel ?? '';
  });

  radiologyButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'radiology');
    return labResult?.buttonLabel ?? '';
  });


  onSave = output();
  onCancel = output();
  protected readonly FormGroup = FormGroup;
  protected readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;
  private utilsService = inject(Utils);
  protected readonly unitsOfMeasure = UNITS_OF_MEASURE;
  protected filteredUnitsMap = new Map<string, Observable<typeof UNITS_OF_MEASURE>>();


  getFormArrayByName(fg: any, nameOrPath: string | string[]) {
    return fg.get(nameOrPath) as FormArray;
  }

  isFormGroup(control: AbstractControl): control is FormGroup {
    return control instanceof FormGroup;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToProcedures && this.proceduresContainer) {
      this.scrollToContainer(this.proceduresContainer);
      this.shouldScrollToProcedures = false;
    }
    if (this.shouldScrollToRadiology && this.radiologyContainer) {
      this.scrollToContainer(this.radiologyContainer);
      this.shouldScrollToRadiology = false;
    }
    if (this.shouldScrollToLabObservations && this.labObservationsContainer) {
      this.scrollToContainer(this.labObservationsContainer);
      this.shouldScrollToLabObservations = false;
    }
  }

  addProcedure(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addProcedure(additionalDataFg);
    this.shouldScrollToProcedures = true;
  }

  addRadiologyReport(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addRadiologyReport(additionalDataFg);
    this.shouldScrollToRadiology = true;
  }

  addObservation(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addObservation(additionalDataFg);
    this.shouldScrollToLabObservations = true;
  }

  onDeleteEventDataItem(index: number, additionalDataFg: FormGroup, name: string) {
    this.additionalDataHelperSeries.deleteEventData(index, additionalDataFg, name);
  }

  getControls(fg: FormGroup, path: string[]) {
    return fg.get(path) as FormArray;
  }

  addValue(labObservationFg: FormGroup, type: string) {
    this.additionalDataHelperSeries.addValueFg(labObservationFg.get(['value', 'valueArray']) as FormArray, type);
  }

  onPresetSelected(labObservationFg: FormGroup, selectedPreset: PresetLabObservationValue | null) {
    this.additionalDataHelperSeries.onPresetSelected(labObservationFg, selectedPreset);
  }

  onSaveEvent() {
    this.utilsService.markFormGroupTouched(this.additionalDataFg());
    this.additionalDataFg().updateValueAndValidity();
    if (this.additionalDataFg().valid) {
      this.onSave.emit();
    }
  }

  getFilteredUnits(quantityFg: FormGroup): Observable<typeof UNITS_OF_MEASURE> {
    // Use the form group instance as the key instead of its value
    if (!this.filteredUnitsMap.has(quantityFg as any)) {
      const unitControl = quantityFg.get('unit');
      if (unitControl) {
        const filtered$ = unitControl.valueChanges.pipe(
          startWith(unitControl.value || ''),
          map(value => this._filterUnits(value || ''))
        );
        this.filteredUnitsMap.set(quantityFg as any, filtered$);
      }
    }
    return this.filteredUnitsMap.get(quantityFg as any)!;
  }

  private _filterUnits(value: string): typeof UNITS_OF_MEASURE {
    const filterValue = value.toLowerCase();
    return this.unitsOfMeasure.filter(unit =>
      unit.Display.toLowerCase().startsWith(filterValue)
    );
  }

  private scrollToContainer(container: ElementRef): void {
    if (container) {
      const element = container.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}
