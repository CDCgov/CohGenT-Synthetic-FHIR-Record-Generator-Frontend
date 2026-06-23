import {Component, input, output} from '@angular/core';
import {FormRule} from '../../../../models/use-case';
import {NgClass} from '@angular/common';
import {FormGroup} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {RuleTitlePipe} from '../../../../pipes/rule-title-pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';

@Component({
  selector: 'app-step-selector',
  imports: [
    NgClass,
    MatIcon,
    RuleTitlePipe,
    MatTooltip
  ],
  templateUrl: './step-selector.component.html',
  styleUrl: './step-selector.component.scss'
})
export class StepSelectorComponent {
  formRules = input.required<FormRule[]>();
  selectedRuleIndex = input.required<number>();
  form = input.required<FormGroup>();
  disabled  = input<boolean>(false);
  menuDisabledMessage = input<string>('');

  formRuleSelectedEvent = output<number>();

  protected readonly UI_CONSTANTS = UI_CONSTANTS;

  onFormRuleSelected(index: number) {
    if(!this.disabled()){
      this.formRuleSelectedEvent.emit(index);
    }
  }
}
