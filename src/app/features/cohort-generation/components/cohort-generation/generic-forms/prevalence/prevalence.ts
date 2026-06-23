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
  form = input.required<FormGroup>();
  option = input.required<Option>();
  originalFrom = input<FormGroup | null>(null);
  canRestoreDefaults  = input<boolean>(false);

  onRestoreDefaults() {
    this.form().clearValidators();
    this.form().markAsPristine();
  }
}
