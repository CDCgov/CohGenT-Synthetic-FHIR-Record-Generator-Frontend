import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OccupationOption} from '../../../../models/use-case';
import {OccupationHelperService} from '../../../../services/form-helpers/occupation-helper.service';
import {map, Observable, startWith} from 'rxjs';
import {Concept} from '../../../../models/cohort-generation-request-body';
import {AsyncPipe} from '@angular/common';
import {ChipsPipe} from '../../../../pipes/chips-pipe';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-occupation-form',
  imports: [
    AsyncPipe,
    ChipsPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './occupation-form.html',
  styleUrls: [
    './occupation-form.scss',
    '../tribal-affiliation/tribal-affiliation.component.scss',
    '../../cohort-generation.component.scss'
  ],
})
export class OccupationForm {
  /** The form group containing occupation controls */
  form = input.required<FormGroup>();

  /** Configuration option defining the occupation field behavior */
  option = input.required<OccupationOption>();

  /** The original form group for comparison or reset purposes */
  originalForm = input<FormGroup>();

  /** Service for occupation form helpers and data */
  private occupationService = inject(OccupationHelperService);

  /** Signal containing all available occupation from the service */
    // Get all occupations from the service
  protected allOccupations$ = this.occupationService.getPatientOccupations();


  /**
   * Get filtered occupations for autocomplete based on form control value changes
   */
  getFilteredOccupations(): Observable<Concept[]> {
    const fg = this.form().get(this.option().ruleId);
    const occupationConceptControl = fg?.get('occupationConcept');

    if (!occupationConceptControl) {
      return new Observable(subscriber => subscriber.next([]));
    }

    return occupationConceptControl.valueChanges.pipe(
      startWith(occupationConceptControl.value || ''),
      map(value => this._filterOccupations(value))
    );
  }

  /** Filters the occupation list based on display name or code matching the input value */
  private _filterOccupations(value: Concept | string | null): Concept[] {
    const occupations = this.allOccupations$();
    if (!occupations) return [];

    // If value is null or empty, return all affiliations
    if (!value) return occupations;

    // If value is a Concept object, extract the display name for filtering
    const searchTerm = typeof value === 'string' ? value : value.display || '';
    const filterValue = searchTerm.toLowerCase();

    return occupations.filter(el =>
      el.display?.toLowerCase().startsWith(filterValue) ||
      el.code?.toLowerCase().startsWith(filterValue)
    );
  }

  /**
   * Display function for mat-autocomplete
   * Shows the display name of the selected occupation
   */
  displayOccupation(value: Concept | string | null): string {
    if (!value) return '';

    // If value is already a Concept object, return its display
    if (typeof value === 'object' && value.display) {
      return value.display;
    }

    // If value is a string (code), look it up
    if (typeof value === 'string') {
      const occupations = this.allOccupations$();
      if (!occupations) return value;

      const occupation = occupations.find(a => a.code === value);
      return occupation?.display || value;
    }

    return '';
  }

  /** Restores the tribal occupation field to its default values from the original form */
  protected onRestoreDefaults() {
    this.form().get(this.option().ruleId)?.patchValue(this.originalForm()?.get(this.option().ruleId)?.value);
  }

}
