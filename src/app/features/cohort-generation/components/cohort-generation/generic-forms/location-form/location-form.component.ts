import {Component, input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../../../../models/use-case';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {US_STATES_LIST} from '../../../../../../constants/us-states';
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
  form = input.required<FormGroup>();
  originalFrom = input.required<FormGroup>();
  option = input.required<Option>();
  readonly US_STATES_LIST = US_STATES_LIST;
  filteredStates: Observable<UsState[]>;

  ngOnInit() {
    this.filteredStates = this.form().get(['patient-location','state'])?.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(display => (display ? this._filter(display) : this.US_STATES_LIST.slice()))
    ) ?? of([]);
  }

  private _filter(value: string): UsState[] {
    const filterValue = value.toLowerCase();
    return this.US_STATES_LIST.filter(state =>
      state.name.toLowerCase().startsWith(filterValue) || state.abbreviation.toLowerCase().startsWith(filterValue));
  }



  displayFn(state?: UsState): string {
    return state ? state.name : '';
  }
}
