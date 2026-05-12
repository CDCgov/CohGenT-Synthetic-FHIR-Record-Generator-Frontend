import {Component, input, output} from '@angular/core';
import {FormRule} from '../../../../models/use-case';
import {NgClass} from '@angular/common';
import {FormGroup} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {RuleTitlePipe} from '../../../../pipes/rule-title-pipe';

@Component({
  selector: 'app-step-selector',
  imports: [
    NgClass,
    MatIcon,
    RuleTitlePipe
  ],
  templateUrl: './step-selector.component.html',
  styleUrl: './step-selector.component.scss'
})
export class StepSelectorComponent {
  formRules = input.required<FormRule[]>();
  selectedRuleIndex = input.required<number>();
  form = input.required<FormGroup>();

  formRuleSelectedEvent = output<number>();

  onFormRuleSelected(index: number) {
    this.formRuleSelectedEvent.emit(index);
  }
}
