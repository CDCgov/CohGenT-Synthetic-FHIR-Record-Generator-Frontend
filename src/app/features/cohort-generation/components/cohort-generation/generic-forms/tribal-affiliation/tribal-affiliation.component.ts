import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TribalAffiliationOption} from '../../../../models/use-case';
import { TribalAffiliationHelperService } from '../../../../services/form-helpers/tribal-affiliation-helper.service';
import { Concept } from '../../../../models/cohort-generation-request-body';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatInput, MatLabel, MatError } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Prevalence } from '../prevalence/prevalence';
import { ChipsPipe } from '../../../../pipes/chips-pipe';
import { AsFormGroupPipe } from '../../../../../../shared/pipes/as-form-group-pipe';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-tribal-affiliation',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatOption,
    MatRadioGroup,
    MatRadioButton,
    MatIcon,
    MatTooltip,
    Prevalence,
    ChipsPipe,
    AsFormGroupPipe,
    MatButton
  ],
  templateUrl: './tribal-affiliation.component.html',
  styleUrls: ['./tribal-affiliation.component.scss', '../../cohort-generation.component.scss']
})
export class TribalAffiliation {
  form = input.required<FormGroup>();
  option = input.required<TribalAffiliationOption>();
  originalFrom = input<FormGroup>();
  private tribalAffiliationHelper = inject(TribalAffiliationHelperService);

  // Get all tribal affiliations from the service
  protected allAffiliations$ = this.tribalAffiliationHelper.getTribalAffiliationList();

  /**
   * Get filtered affiliations for autocomplete based on form control value changes
   * This follows the same pattern as observations.ts getFilteredUnits()
   */
  getFilteredAffiliations(): Observable<Concept[]> {
    const fg = this.form().get(this.option().ruleId);
    const affiliationControl = fg?.get('affiliation');

    if (!affiliationControl) {
      return new Observable(subscriber => subscriber.next([]));
    }

    return affiliationControl.valueChanges.pipe(
      startWith(affiliationControl.value || ''),
      map(value => this._filterAffiliations(value))
    );
  }

  private _filterAffiliations(value: Concept | string | null): Concept[] {
    const affiliations = this.allAffiliations$();
    if (!affiliations) return [];

    // If value is null or empty, return all affiliations
    if (!value) return affiliations;

    // If value is a Concept object, extract the display name for filtering
    const searchTerm = typeof value === 'string' ? value : value.display || '';
    const filterValue = searchTerm.toLowerCase();

    return affiliations.filter(affiliation =>
      affiliation.display?.toLowerCase().startsWith(filterValue) ||
      affiliation.code?.toLowerCase().startsWith(filterValue)
    );
  }

  /**
   * Display function for mat-autocomplete
   * Shows the display name of the selected affiliation
   */
  displayAffiliation(value: Concept | string | null): string {
    if (!value) return '';

    // If value is already a Concept object, return its display
    if (typeof value === 'object' && value.display) {
      return value.display;
    }

    // If value is a string (code), look it up
    if (typeof value === 'string') {
      const affiliations = this.allAffiliations$();
      if (!affiliations) return value;

      const affiliation = affiliations.find(a => a.code === value);
      return affiliation?.display || value;
    }

    return '';
  }

  protected onRestoreDefaults() {
    this.form().get(this.option().ruleId)?.patchValue(this.originalFrom().get(this.option().ruleId)?.value);
  }
}
