/**
 * Component for managing location selection with state autocomplete.
 * Provides filtered state selection with autocomplete functionality.
 */
import {Component, input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../../../../models/use-case';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {US_STATES_LIST} from '../../../../../../constants/app-constants';
import {AsyncPipe} from '@angular/common';
import {map, Observable, of, startWith} from 'rxjs';
import {ChipsPipe} from '../../../../pipes/chips-pipe';
import {UsState} from '../../../../models/us-state';

@Component({
  selector: 'app-location-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    AsyncPipe,
    ChipsPipe,
  ],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss' , '../../cohort-generation.component.scss']
})


export class LocationFormComponent implements OnInit{
  /** The form group containing location-related controls */
  form = input.required<FormGroup>();

  /** The original form group for reset to default purpose */
  originalFrom = input.required<FormGroup>();

  /** Configuration option defining the location field behavior */
  option = input.required<Option>();

  /** List of all US states */
  readonly US_STATES_LIST = US_STATES_LIST;

  /** Observable stream of filtered states based on user input */
  filteredStates: Observable<UsState[]>;

  /** Initializes the filtered states observable with autocomplete logic */
  ngOnInit() {
    this.filteredStates = this.form().get(['patient-location','state'])?.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(display => (display ? this._filter(display) : this.US_STATES_LIST.slice()))
    ) ?? of([]);
  }

  /** Filters the state list based on the input value matching name or abbreviation */
  private _filter(value: string): UsState[] {
    const filterValue = value.toLowerCase();
    return this.US_STATES_LIST.filter(state =>
      state.name.toLowerCase().startsWith(filterValue) || state.abbreviation.toLowerCase().startsWith(filterValue));
  }



  /** Display function for the autocomplete to show state name */
  displayFn(state?: UsState): string {
    return state ? state.name : '';
  }
}
