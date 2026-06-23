import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import {Component, computed, input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Option} from '../../../../models/use-case';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSlider, MatSliderRangeThumb} from '@angular/material/slider';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {LowerCasePipe} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {ChipsPipe} from '../../../../pipes/chips-pipe';


@Component({
  selector: 'app-range-form',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    MatTooltip,
    MatSlider,
    MatSliderRangeThumb,
    LowerCasePipe,
    ChipsPipe
  ],
  templateUrl: './range-form.component.html',
  styleUrls: ['./range-form.component.scss', '../../cohort-generation.component.scss']
})
export class RangeFormComponent {
  form = input.required<FormGroup>();
  originalFrom = input.required<FormGroup>();
  option = input.required<Option>();
  rangeOption = computed(() => {
    const opt = this.option();
    return opt.control === 'range' ? opt : null;
  });
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG

  onRestoreDefaults(ruleId: string) {
    this.form().get(ruleId)?.setValue(this.originalFrom().get(ruleId)?.value);
    this.form().get(ruleId)?.clearValidators();
    this.form().get(ruleId)?.markAsPristine();
  }
}
