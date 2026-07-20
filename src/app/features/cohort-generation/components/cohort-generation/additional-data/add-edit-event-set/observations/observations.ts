/**
 * Component for managing lab observation entries within an event set.
 * Handles displaying and deleting observation concepts with their associated values, ranges, and units.
 */
import {Component, inject, input, output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ConceptFormComponent} from "../../../form-primitives/concept-form/concept-form.component";
import {FormArray, FormsModule, ReactiveFormsModule, isFormGroup, FormGroup} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {SimpleWeightingFormArray} from "../../../form-primitives/simple-weighting-form-array/simple-weighting-form-array";
import {UI_CONSTANTS} from '../../../../../../../constants/ui-constants';
import {AdditionalDataHelperService} from '../../../../../services/form-helpers/additional-data-helper.service';
import {PresetLabObservationValue} from '../../../../../services/preset-lab-observation-values.service';
import {Utils} from '../../../../../services/utils.service';
import {map, Observable, of, startWith} from 'rxjs';
import {UNITS_OF_MEASURE} from '../../../../../../../constants/app-constants';
import {ErrorMessageComponent} from '../../../../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-observations',
  imports: [
    AsyncPipe,
    ConceptFormComponent,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatTooltip,
    ReactiveFormsModule,
    SimpleWeightingFormArray,
    ErrorMessageComponent
  ],
  templateUrl: './observations.html',
  styleUrl: './observations.scss',
})
export class Observations {
  /** Form array containing lab observation form groups */
  observationsFormArray = input<FormArray>();

  /** Emits when an observation is deleted with its index */
  onDeleteObservation = output<number>();

  /** Utility service for form operations */
  utils = inject(Utils);

  /** Available units of measure for observations */
  protected readonly UNITS_OF_MEASURE = UNITS_OF_MEASURE;

  /** Service for managing additional data form operations */
  additionalDataHelperSeries = inject(AdditionalDataHelperService);

  /** UI constants for labels and messages */
  protected readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Helper function to check if a control is a FormGroup */
  protected readonly isFormGroup = isFormGroup;

  /** Map to cache filtered units observables for each quantity form group */
  protected filteredUnitsMap = new Map<string, Observable<typeof UNITS_OF_MEASURE>>();

  /** Adds a new value form group to the observation's value array */
  addValue(labObservationFg: FormGroup, type: string) {
    this.additionalDataHelperSeries.addValueFg(labObservationFg.get(['value', 'valueArray']) as FormArray, type);
  }

  /** Handles preset selection and populates the observation form with preset values */
  onPresetSelected(labObservationFg: FormGroup, selectedPreset: PresetLabObservationValue | null) {
    this.additionalDataHelperSeries.onPresetSelected(labObservationFg, selectedPreset);
  }

  /** Returns an observable of filtered units based on user input for autocomplete */
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
      } else {
        // If unitControl doesn't exist, return an observable that emits an empty array
        this.filteredUnitsMap.set(quantityFg as any, of([]));
      }
    }
    return this.filteredUnitsMap.get(quantityFg as any)!;
  }

  /** Filters units of measure based on the input value */
  private _filterUnits(value: string): typeof UNITS_OF_MEASURE {
    const filterValue = value.toLowerCase();
    return this.UNITS_OF_MEASURE.filter(unit =>
      unit.Display.toLowerCase().startsWith(filterValue)
    );
  }

}
