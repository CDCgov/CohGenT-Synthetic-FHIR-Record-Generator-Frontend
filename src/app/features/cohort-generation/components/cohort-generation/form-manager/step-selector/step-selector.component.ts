/**
 * Component for displaying and navigating between form steps in the cohort generation workflow.
 * Provides a visual step indicator with clickable steps, showing completion status and current selection.
 * Can be disabled to prevent navigation during certain operations.
 */
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
  /** Array of form rules defining the steps to display */
  formRules = input.required<FormRule[]>();

  /** The index of the currently selected step (0-based) */
  selectedRuleIndex = input.required<number>();

  /** The form group containing all step data */
  form = input.required<FormGroup>();

  /** Whether step navigation is disabled */
  disabled  = input<boolean>(false);

  /** Message to display when menu is disabled (shown in tooltip) */
  menuDisabledMessage = input<string>('');

  /** Event emitted when a step is selected, passing the step index */
  formRuleSelectedEvent = output<number>();

  /** UI constants for labels and messages */
  protected readonly UI_CONSTANTS = UI_CONSTANTS;

  /**
   * Handles step selection click events.
   * Only emits the selection event if the component is not disabled.
   * @param index - The index of the step that was clicked
   */
  onFormRuleSelected(index: number) {
    if(!this.disabled()){
      this.formRuleSelectedEvent.emit(index);
    }
  }
}
