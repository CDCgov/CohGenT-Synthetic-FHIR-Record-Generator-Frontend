/**
 * Component for managing prevalence input with percentage slider and text input.
 * Allows users to specify prevalence values with option to restore defaults.
 */
import {Component, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Option} from '../../../../models/use-case';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-prevalence',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatFormField,
    MatInput,
    MatError,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './prevalence.html',
  styleUrl: './prevalence.scss',
})
export class Prevalence {
  /** The form group containing prevalence controls */
  form = input.required<FormGroup>();

  /** Configuration option defining the prevalence field behavior */
  option = input.required<Option>();

  /** The original form group for comparison or reset purposes */
  originalFrom = input<FormGroup | null>(null);

  /** Whether the restore defaults button should be rendered */
  canRestoreDefaults  = input<boolean>(false);

  /** Restores the form to default values by patching from original form, clearing validators and marking as pristine */
  onRestoreDefaults() {
    this.form().patchValue(this.originalFrom()?.value, { emitEvent: false });
    this.form().clearValidators();
    this.form().markAsPristine();
  }
}
