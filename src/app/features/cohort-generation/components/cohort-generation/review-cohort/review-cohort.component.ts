import {Component, computed, inject, input, Signal} from '@angular/core';
import {CategoryTuple, FormRule, Option, WeightingOption} from '../../../models/use-case';
import {ViewEventSetComponent} from '../additional-data/view-event-set/view-event-set.component';
import {Concept} from '../../../models/cohort-generation-request-body';
import {RuleTitlePipe} from '../../../pipes/rule-title-pipe';
import {DefaultsSummaryComponent} from '../defaults-summary/defaults-summary';
import {WeightingHelperService} from '../../../services/form-helpers/weighting-helper.service';
import {CohortService} from '../../../services/cohort.service';
import {ProcessedCustomOption, ProcessedRule} from '../../../models/processed-rule';
import {ViewMedicationSet} from '../medications/view-medication-set/view-medication-set';

@Component({
  selector: 'app-review-cohort',
  imports: [
    ViewEventSetComponent,
    RuleTitlePipe,
    DefaultsSummaryComponent,
    ViewMedicationSet,
  ],
  templateUrl: './review-cohort.component.html',
  styleUrl: './review-cohort.component.scss'
})

export class ReviewCohortComponent {
  formRules = input.required<FormRule[] | undefined>();
  formValue = input.required<any>();
  weightingHelperService = inject(WeightingHelperService);
  cohortService = inject(CohortService);
  protected readonly Object = Object;

  /**
   * Gets the form value for a specific step order
   */
  getStepFormValueByOrder(stepOrder: number): any {
    const formValue = this.formValue();
    const stepIndex = stepOrder - 1;
    const stepKey = `step_${stepIndex}`;
    const stepData = formValue?.[stepKey];

    if (!stepData) return null;

    // Extract the custom data
    return stepData[`custom_${stepIndex}`];
  }

  /**
   * Gets the rule for a specific step order
   */
  getRuleByStepOrder(stepOrder: number): FormRule | null {
    const rules = this.formRules();
    if (!rules) return null;

    return rules.find(rule => rule.stepOrder === stepOrder) ?? null;
  }

  /**
   * Pre-processes all rules and their data once using computed signals
   * This prevents function calls from templates
   */
  processedRules: Signal<ProcessedRule[]> = computed(() => {
    const rules = this.formRules()?.slice(0, -2) ?? [];
    const formValue = this.formValue();

    return rules.map(rule => this.processRule(rule, formValue));
  });

  /**
   * Processes a single rule and extracts all necessary data
   */
  private processRule(rule: FormRule, formValue: any): ProcessedRule {
    const stepPath = `step_${rule.stepOrder - 1}`;
    const processed: ProcessedRule = {
      stepOrder: rule.stepOrder,
      title: rule.title,
      type: rule.type
    };

    switch (rule.type) {
      case 'additional-data-time-series':
        processed.data = formValue?.[stepPath]?.['additional-data-time-series'];
        break;

      case 'medication':
        processed.medications = formValue?.[stepPath]?.['medication'] ?? [];
        break;

      case 'custom':
        processed.customOptions = this.processCustomOptions(
          rule.options ?? [],
          rule,
          stepPath,
          formValue
        );
        break;
    }

    return processed;
  }

  /**
   * Processes custom options for a rule
   */
  private processCustomOptions(
    options: Option[],
    rule: FormRule,
    stepPath: string,
    formValue: any
  ): ProcessedCustomOption[] {
    const customPath = `custom_${rule.stepOrder - 1}`;

    return options.map(option => {
      const value = formValue?.[stepPath]?.[customPath]?.[option.ruleId];
      return {
        ruleId: option.ruleId,
        label: this.getRuleLabel(option.ruleId, rule),
        control: option.control,
        displayValue: this.formatControlValue(option.control, value),
        weightedData: option.control === 'weighting'
          ? this.getWeightedData(option, value)
          : undefined,
        conceptData: option.control === 'concept'
          ? this.getConceptData(value)
          : undefined,
        timeRangeData: option.control === 'relative-time-range'
          ? value
          : undefined,
        locationData: option.control === 'location'
          ? this.getLocationData(value)
          : undefined,
      };
    });
  }

  private formatControlValue(controlType: string, value: any): string {
    switch (controlType) {
      case 'checkbox':
        return value ? 'No' : 'Yes';

      case 'location':
        if (!value) return '';
        return [value.state, value.city].filter(Boolean).join(', ');

      case 'range':
        if (!value) return '';
        return `Min: ${value.min ?? ''}, Max: ${value.max ?? ''}`;

      default:
        return '';
    }
  }


  private getWeightedData(option: WeightingOption, value: any): { key: string; value: any }[] {
    if (!value) {
      return [];
    }

    return option.defaultValues.values.map((categoryTuple: CategoryTuple, index: number) => ({
      key: categoryTuple.value,
      value: value?.[index]?.[index] >= 0 ? value?.[index]?.[index] : value?.[index]
    }));
  }

  private getRuleLabel(ruleId: string, rule: FormRule): string {
    if (!ruleId || !rule?.options?.length) {
      return '';
    }
    return rule.options.find(option => option.ruleId === ruleId)?.label ?? '';
  }

  private getConceptData(option: any) : Concept {
    return option as Concept;
  }

  private getLocationData(value: Location | null | undefined): string {
    return [value?.state?.name, value?.city]
      .filter(Boolean)
      .join(', ');
  }

}
