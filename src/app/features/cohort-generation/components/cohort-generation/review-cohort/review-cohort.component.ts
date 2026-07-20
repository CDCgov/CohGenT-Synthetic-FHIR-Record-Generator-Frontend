/**
 * Component for reviewing cohort generation configuration before submission.
 * Displays a read-only summary of all form rules, custom options, medications, and additional data.
 * Processes and formats form data for display using computed signals for optimal performance.
 */
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
  /** Array of form rules defining the cohort generation steps */
  formRules = input.required<FormRule[] | undefined>();

  /** The complete form value containing all user inputs */
  formValue = input.required<any>();

  /** Service for weighting calculations and helpers */
  weightingHelperService = inject(WeightingHelperService);

  /** Service for cohort operations */
  cohortService = inject(CohortService);

  /** Reference to Object for template use */
  protected readonly Object = Object;

  /**
   * Gets the form value for a specific step order.
   * @param stepOrder - The step order number (1-based)
   * @returns The custom data for the specified step, or null if not found
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
   * Gets the rule for a specific step order.
   * @param stepOrder - The step order number (1-based)
   * @returns The form rule for the specified step, or null if not found
   */
  getRuleByStepOrder(stepOrder: number): FormRule | null {
    const rules = this.formRules();
    if (!rules) return null;

    return rules.find(rule => rule.stepOrder === stepOrder) ?? null;
  }

  /**
   * Pre-processes all rules and their data once using computed signals.
   * This prevents function calls from templates and improves performance.
   * Excludes the last two steps (typically review and generate steps).
   */
  processedRules: Signal<ProcessedRule[]> = computed(() => {
    const rules = this.formRules()?.slice(0, -2) ?? [];
    const formValue = this.formValue();

    return rules.map(rule => this.processRule(rule, formValue));
  });

  /**
   * Processes a single rule and extracts all necessary data.
   * @param rule - The form rule to process
   * @param formValue - The complete form value
   * @returns Processed rule with extracted and formatted data
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
   * Processes custom options for a rule, extracting and formatting values.
   * @param options - Array of options to process
   * @param rule - The parent form rule
   * @param stepPath - The path to the step in form value
   * @param formValue - The complete form value
   * @returns Array of processed custom options with formatted display values
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

  /**
   * Formats control values for display based on control type.
   * @param controlType - The type of control (checkbox, location, range, etc.)
   * @param value - The raw control value
   * @returns Formatted string for display
   */
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

  /**
   * Extracts weighted data from a weighting option.
   * @param option - The weighting option with default values
   * @param value - The weighting values from form
   * @returns Array of key-value pairs for weighted categories
   */
  private getWeightedData(option: WeightingOption, value: any): { key: string; value: any }[] {
    if (!value) {
      return [];
    }

    return option.defaultValues.values.map((categoryTuple: CategoryTuple, index: number) => ({
      key: categoryTuple.value,
      value: value?.[index]?.[index] >= 0 ? value?.[index]?.[index] : value?.[index]
    }));
  }

  /**
   * Gets the label for a rule by its ID.
   * @param ruleId - The rule identifier
   * @param rule - The parent form rule containing options
   * @returns The label for the rule, or empty string if not found
   */
  private getRuleLabel(ruleId: string, rule: FormRule): string {
    if (!ruleId || !rule?.options?.length) {
      return '';
    }
    return rule.options.find(option => option.ruleId === ruleId)?.label ?? '';
  }

  /**
   * Extracts concept data from an option value.
   * @param option - The option value containing concept data
   * @returns The concept object
   */
  private getConceptData(option: any) : Concept {
    return option as Concept;
  }

  /**
   * Formats location data for display.
   * @param value - The location value with state and city
   * @returns Formatted location string (e.g., "Georgia, Atlanta")
   */
  private getLocationData(value: Location | null | undefined): string {
    return [value?.state?.name, value?.city]
      .filter(Boolean)
      .join(', ');
  }

}
