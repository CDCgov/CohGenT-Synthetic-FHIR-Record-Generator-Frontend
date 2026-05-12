import {computed, inject, Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ConceptHelperService} from './concept-helper.service';
import {SYSTEM_LIST, TIME_PERIOD_UNIT_LIST} from '../../../../constants/app-constants';
import {WeightingHelperService} from './weighting-helper.service';
import {CohortService} from '../cohort.service';
import {
  PresetLabObservationValue,
  PresetLabObservationValuesService
} from '../preset-lab-observation-values.service';
import {debounceTime, distinctUntilChanged, of, tap} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdditionalDataHelperService {
  private fb = inject(FormBuilder);
  private conceptHelperService = inject(ConceptHelperService);
  readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;
  readonly SYSTEM_LIST = SYSTEM_LIST;
  private presetLabObservationValuesService = inject(PresetLabObservationValuesService);

  private cohortService = inject(CohortService);
  additionalEntities =  computed(() =>{
    return this.cohortService.cohortData()?.selectedUseCase?.commonEntities?.additionalEntities;
  });

  private weightingHelperService: WeightingHelperService = inject(WeightingHelperService);

  readonly valueTypes = [{display: "Quantity", value: "quantity"}, {display: "String", value: "string"}]

  addEvent(fgArray: FormArray) {
    const eventFg = this.buildEventFg();
    fgArray.push(eventFg);
  }

  private buildDiagnosticPanel(){
    let fg: FormGroup = new FormGroup({
      includeDiagnosticReport: new FormControl(false),
    });
    this.subscribeToDiagnosticPanelValueChanges(fg);
    return fg;
  }

  private subscribeToDiagnosticPanelValueChanges(fg: FormGroup){
    const includeDiagnosticReportFc = fg.get('includeDiagnosticReport') as FormControl;
    includeDiagnosticReportFc.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(includeDiagnosticReport => {
      if(includeDiagnosticReport){
        const defaultSystem = this.SYSTEM_LIST.find(system => system.label == 'LOINC');
        const diagnosticReportConcept = this.conceptHelperService.buildFg(defaultSystem);
        fg.addControl('diagnosticReportConcept', diagnosticReportConcept, { emitEvent: false });
      }
      else{
        fg.removeControl('diagnosticReportConcept', { emitEvent: false });
      }
    });

  }

  /**
   * Custom validator to ensure event set has at least one clinical data item
   */
  private eventSetContentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fg = control as FormGroup;

      const hasLabObservations = fg.get('labObservations')?.value?.length > 0;
      const hasProcedures = fg.get('procedures')?.value?.length > 0;
      const hasRadiology = fg.get('radiologyList')?.value?.length > 0;

      if (!hasLabObservations && !hasProcedures && !hasRadiology) {
        return { noContent: true };
      }

      return null;
    };
  }

  private buildEventFg() {
    const eventSetTimingFg = this.buildEventSetTimingFg();
    const diagnosticPanelFg = this.buildDiagnosticPanel();
    return this.fb.group({
        eventSetTiming: eventSetTimingFg,
        diagnosticPanel: diagnosticPanelFg,
        deleteOnCancel: new FormControl(true),
      },
      { validators: this.eventSetContentValidator() }
    );
  }

  addObservation(additionalDataFg: FormGroup, importedFormValue?: any) {
    const defaultSystemStr = this.additionalEntities()!.find(value=> value.entityId == 'labResult')?.defaultSystem;
    const defaultSystem = SYSTEM_LIST.find(system => system.label === defaultSystemStr);

    // Create a single lab observation
    const labObservationFg = this.createLabObservationFg(defaultSystem, importedFormValue);
    const minMaxUnitFg = labObservationFg.get(['value', 'valueArray', '0']) as FormGroup;
    minMaxUnitFg.valueChanges.subscribe(change => {
      const selectedPresetFc = labObservationFg.get(['selectedPreset']) as FormControl;
      selectedPresetFc.patchValue("Custom", {emitEvent: false});
    })

    if(!additionalDataFg.get('labObservations')) {
      additionalDataFg.addControl("labObservations", this.fb.array([labObservationFg]));
    }
    else {
      // Add to existing array
      const labObservationFormArray = additionalDataFg.get('labObservations') as FormArray;
      labObservationFormArray.push(labObservationFg);
    }

    // Trigger validation update
    additionalDataFg.updateValueAndValidity();
  }

  /**
   * Creates a single lab observation FormGroup
   */
  private createLabObservationFg(defaultSystem: any, importedFormValue?: any): FormGroup {
    const labObservationFg = this.fb.group({
      value: this.getObservationValueFg(importedFormValue),
      labResultConcept: this.conceptHelperService.buildFg(defaultSystem),
      availablePresets: new FormControl([]),
      selectedPreset: new FormControl(null),
      isLoadingPresets: new FormControl(false) // Explicitly set to false
    });

    // Subscribe to concept changes for this specific lab observation
    this.subscribeToConceptChanges(labObservationFg);

    return labObservationFg;
  }

  private subscribeToConceptChanges(labObservationFg: FormGroup) {
    labObservationFg.get('labResultConcept')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => {
        // Only emit if code or system actually changed
        return prev?.code === curr?.code && prev?.system === curr?.system;
      }),
      tap(() => {
        // Set loading state to true when search begins
        labObservationFg.get('isLoadingPresets')?.setValue(true);
      }),
      switchMap((value) => {
        const code = value?.code;
        const system = value?.systemUri || value?.system;

        if (code && system) {
          return this.presetLabObservationValuesService.getObservationValuePresets({
            code: code,
            system: system
          });
        }
        return of([]);
      }),
    ).subscribe(presets => {

      // Update THIS lab observation's availablePresets control ONLY
      const availablePresetsCtrl = labObservationFg.get('availablePresets');
      availablePresetsCtrl?.setValue(presets);

      // Set loading state to false when search completes
      labObservationFg.get('isLoadingPresets')?.setValue(false);
    });
  }

  /**
   * Handle when a user selects a preset from the dropdown
   * This updates the quantity values (min, max, unit) in the value array
   */
  onPresetSelected(labObservationFg: FormGroup, selectedPreset: PresetLabObservationValue | null) {
    labObservationFg.get('selectedPreset')?.setValue(selectedPreset, { emitEvent: false });
    if (!selectedPreset) {
      // User selected "Custom" - do nothing
      return;
    }

    const valueArray = labObservationFg.get(['value', 'valueArray']) as FormArray;
    if (valueArray && valueArray.length > 0) {
      const firstQuantityFg = valueArray.at(0) as FormGroup;

      firstQuantityFg.get('min')?.setValue(selectedPreset.quantityMin, { emitEvent: false });
      firstQuantityFg.get('max')?.setValue(selectedPreset.quantityMax, { emitEvent: false });
      firstQuantityFg.get('unit')?.setValue(selectedPreset.quantityUnit, { emitEvent: false });
    }
  }

  handleAdditionalDataPresetsImport(labObservationFg: FormGroup, selectedPreset: PresetLabObservationValue){
    if(!labObservationFg || !selectedPreset){
      console.warn("Invalid Parameters");
      return;
    }

    // Get the concept to fetch presets
    const labResultConcept = labObservationFg.get('labResultConcept')?.value;
    if (!labResultConcept?.code || !(labResultConcept?.systemUri || labResultConcept?.system)) {
      console.warn("No concept code or system found");
      return;
    }

    // Set loading state to true
    labObservationFg.get('isLoadingPresets')?.setValue(true, { emitEvent: false });

    this.presetLabObservationValuesService.getObservationValuePresets({
      code: labResultConcept.code,
      system: labResultConcept.systemUri || labResultConcept.system
    }).subscribe(presets => {
      // Update the lab observation's available presets
      labObservationFg.get('availablePresets')?.setValue(presets, { emitEvent: false });

      // Set loading state to false
      labObservationFg.get('isLoadingPresets')?.setValue(false, { emitEvent: false });

      // Find and apply the specific preset
      const preset = presets.find(p => p.presetName === selectedPreset?.presetName);

      if (preset) {
        // Store the selected preset
        labObservationFg.get('selectedPreset')?.setValue(preset, { emitEvent: false });
        // Apply the preset values
        this.onPresetSelected(labObservationFg, preset);
      }
    });
  }

  addProcedure(additionalDataFg: FormGroup<any>) {
    const defaultSystemStr = this.additionalEntities()!.find(value=> value.entityId == 'procedure')?.defaultSystem;
    const defaultSystem = SYSTEM_LIST.find(system => system.label === defaultSystemStr);

    const procedureFg = this.fb.group({
      procedureConcept: this.conceptHelperService.buildFg(defaultSystem)
    });

    if(!additionalDataFg.get('procedures')) {
      additionalDataFg.addControl("procedures", this.fb.array([procedureFg]));
    }
    else {
      const procedureFormArray = additionalDataFg.get('procedures') as FormArray;
      procedureFormArray.push(procedureFg);
    }

    // Trigger validation update
    additionalDataFg.updateValueAndValidity();
  }

  addRadiologyReport(additionalDataFg: FormGroup<any>) {
    const defaultSystemStr = this.additionalEntities()!.find(value=> value.entityId == 'radiology')?.defaultSystem;
    const defaultSystem = SYSTEM_LIST.find(system => system.label === defaultSystemStr);

    const radiologyReportFg = this.fb.group({
      radiologyConcept: this.conceptHelperService.buildFg(defaultSystem)
    });

    if(!additionalDataFg.get('radiologyList')) {
      additionalDataFg.addControl("radiologyList", this.fb.array([radiologyReportFg]));
    }
    else {
      const radiologyReportFormArray = additionalDataFg.get('radiologyList') as FormArray;
      radiologyReportFormArray.push(radiologyReportFg);
    }

    // Trigger validation update
    additionalDataFg.updateValueAndValidity();
  }

  importAdditionalData(formArray: FormArray, importData: any[]) {
    importData.forEach(value => {
      const eventFg = this.buildEventFg();

      if(value.diagnosticPanel.includeDiagnosticReport){
        const diagnosticReportFg  = eventFg.get('diagnosticPanel') as FormGroup;
        const diagnosticReportConcept = this.conceptHelperService.buildFg();
        diagnosticReportFg.addControl('diagnosticReportConcept', diagnosticReportConcept, { emitEvent: false });
      }

      if(value?.labObservations?.length > 0) {
        value.labObservations.forEach((labObsValue: any) => {
          this.addObservation(eventFg, labObsValue);
        });
      }
      if(value?.procedures?.length > 0) {
        value.procedures.forEach(() => {
          this.addProcedure(eventFg);
        });
      }
      if(value?.radiologyReports?.length > 0) {
        value.radiologyReports.forEach(() => {
          this.addRadiologyReport(eventFg);
        });
      }


      eventFg.patchValue(value, { emitEvent: false });
      formArray.push(eventFg);

      if(value?.labObservations?.length > 0) {
        const labObservationsControl = eventFg.get('labObservations');

        if (labObservationsControl instanceof FormArray) {
          value.labObservations.forEach((labObsValue: any, index: number) => {
            const labObservationFg = labObservationsControl.at(index) as FormGroup;

            if(labObsValue?.labResultConcept && labObsValue?.value?.valueType == 'quantity') {
              // Check if there's a preset to import
              const selectedPreset = labObsValue?.selectedPreset;

              if(selectedPreset) {
                this.handleAdditionalDataPresetsImport(labObservationFg, selectedPreset);
              }
            }
          });
        }
      }
    });
  }

  /**
   * Used to delete Procedures and Observations only and not whole events
   * @param index
   * @param additionalDataFg
   * @param name - "procedure" or "labObservation"
   */
  deleteEventData(index: number, additionalDataFg: FormGroup<any>, name: string) {
    const fgArray = additionalDataFg.get(name) as FormArray;
    if(fgArray?.length == 1){ //if the fg array has only one element, remove the whole fg array
      additionalDataFg.removeControl(name);
    }
    else {
      fgArray.removeAt(index);
    }

    // Trigger validation update
    additionalDataFg.updateValueAndValidity();
  }

  private buildEventSetTimingFg() {
    let fg =  new FormGroup({
      onsetPlus: this.fb.group({
        value: new FormControl(0),
        unit: new FormControl(this.TIME_PERIOD_UNIT_LIST[0].value),
      }),
      repeat: new FormControl(false),
      every: this.fb.group({
        value: new FormControl({value: 0, disabled: true}),
        unit: new FormControl({value:this.TIME_PERIOD_UNIT_LIST[2].value, disabled: true}),
      })
    });
    this.subscribeToValueChange(fg)
    return fg;
  }

  private getObservationValueFg(importedData?: any) : FormGroup<any> {

    const fg = new FormGroup({
      valueType: new FormControl(),
      valueArray: new FormArray<FormControl<any>>([]),
    });

    fg.get('valueType')!.valueChanges.subscribe((value) => {
      const newArray = this.fb.array([]);
      this.addValueFg(newArray, value);
      fg.setControl('valueArray', newArray);
    });

    if(importedData?.value){
      importedData.value.valueArray.forEach(() => {
        this.addValueFg(fg.controls.valueArray, importedData.value.valueType);
      })
    }
    else{
      // Set default value type which will trigger the valueChanges above
      fg.get(['valueType'])!.setValue(this.valueTypes[0].value);
    }
    return fg;
  }

  addValueFg(valueArray: FormArray, valueType: string){
    if(valueType == 'string'){
      const fg = new FormGroup({
        value: new FormControl('', [Validators.required]),
        weight: new FormControl(
          { value: valueArray.controls.length == 0 ? 100 : 0, disabled: valueArray.length === 0 },
          [Validators.required, Validators.min(0), Validators.max(this.weightingHelperService.units() == 'percent' ? 100 : 1)]
        ),
        lock: new FormControl(false)
      });
      fg.get('lock')?.valueChanges.subscribe((locked) => {
        const valueFc = fg.get('value');
        const weightFc = fg.get('weight');
        if(locked){
          valueFc?.disable({ emitEvent: false });
          weightFc?.disable({ emitEvent: false });
        } else {
          valueFc?.enable({ emitEvent: false });
          weightFc?.enable({ emitEvent: false });
        }
      })

      valueArray.push(fg);

      // Enable all weight controls when there's more than one item
      if(valueArray.length == 2) {
        valueArray.controls.forEach(control => {
          const weightControl = control.get('weight');
          if(weightControl?.disabled) {
            weightControl.enable({ emitEvent: false });
          }
        });
      }
    }
    else if (valueType == 'quantity'){
      const fg = new FormGroup({
        min: new FormControl('',[Validators.required]),
        max: new FormControl('',[Validators.required]),
        unit: new FormControl('',[Validators.required]),
        // Removed availablePresets - stored at lab observation level
      });
      valueArray.push(fg);
    }
  }

  private subscribeToValueChange(fg: FormGroup) {
    fg.valueChanges.subscribe((value) => {
      const everyValueCtrl = fg.get(['every', 'value']);
      const everyUnitCtrl  = fg.get(['every', 'unit']);

      if (value?.repeat === true) {
        everyValueCtrl?.enable({ emitEvent: false });
        everyUnitCtrl?.enable({ emitEvent: false });
      } else {
        everyValueCtrl?.setValue(0, { emitEvent: false });
        everyUnitCtrl?.setValue(this.TIME_PERIOD_UNIT_LIST[2].value, { emitEvent: false });
        everyValueCtrl?.disable({ emitEvent: false });
        everyUnitCtrl?.disable({ emitEvent: false });
      }
    });
  }
}
