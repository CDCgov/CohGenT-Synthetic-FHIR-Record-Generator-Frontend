/**
 * Component for rendering a checkbox form control with label and description.
 * Used as a form primitive in the cohort generation workflow.
 */
import {Component, input} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Option} from '../../../../models/use-case';
import {ChipsPipe} from '../../../../pipes/chips-pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-checkbox-form',
  imports: [
    MatCheckbox,
    ReactiveFormsModule,
    ChipsPipe,
    MatTooltip,
    MatIcon,
  ],
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss', '../../cohort-generation.component.scss']
})
export class CheckboxFormComponent {
  form = input.required<FormGroup>();
  originalFrom = input.required<FormGroup>();
  option = input.required<Option>();
}
