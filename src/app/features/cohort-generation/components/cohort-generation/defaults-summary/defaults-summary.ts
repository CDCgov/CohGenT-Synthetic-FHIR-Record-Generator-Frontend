import {
  Component,
  input,
  output,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { FormRule, Option } from '../../../models/use-case';
import {CustomItemReview} from './custom-item-review/custom-item-review.component';
import { MatIcon } from "@angular/material/icon";

export interface SummaryOption {
  label: string;
  ruleId: string;
  control: 'checkbox' | 'range' | 'weighting' | 'location' | 'concept' | 'relative-time-range';
  value: any;
}

@Component({
  selector: 'app-defaults-summary',
  standalone: true,
  imports: [CommonModule, MatButton, CustomItemReview, MatIcon],
  templateUrl: './defaults-summary.html',
  styleUrls: ['./defaults-summary.scss']
})
export class DefaultsSummaryComponent {
  title = input<string>('');
  rule = input.required<FormRule>();
  stepFormValue = input.required<any>();
  units = input<'decimal' | 'percent'>('percent');
  reviewOnly = input<boolean>(false);

  onCustomize = output<void>();
  confirmDefaults = output<boolean>();

  confirmChecked = false;

  // Computed signal that processes options from form value
  options = computed(() => {
    const rule = this.rule();
    const stepFormValue = this.stepFormValue();
    const ruleOptions = rule?.options ?? [];

    if (!ruleOptions.length) return [];
    if (!stepFormValue) return [];

    return ruleOptions.map(opt => {
      const rawValue = stepFormValue[opt.ruleId as string] ?? null;
      return this.toSummaryOption(opt, rawValue);
    });
  });

  handleCustomizeClick() {
    this.onCustomize.emit();
  }

  handleConfirmChange(checked: boolean) {
    this.confirmChecked = checked;
    this.confirmDefaults.emit(checked);
  }

  private toSummaryOption(rule: Option, rawValue: unknown): SummaryOption {
    const base = {
      label: rule.label,
      ruleId: rule.ruleId,
      control: rule.control as SummaryOption['control']
    } as const;

    switch (rule.control) {
      case 'weighting': {
        const value = this.normalizeWeightingValues(rule, rawValue);
        return { ...base, value };
      }

      case 'range': {
        return { ...base, value: rawValue ?? rule.defaultValues ?? null };
      }

      case 'location': {
        return { ...base, value: rawValue ?? rule.defaultValues ?? null };
      }

      case 'checkbox': {
        const resolved = rawValue ?? rule.defaultState ?? false;
        return { ...base, value: !!resolved };
      }

      default: {
        const value = rawValue ?? rule.defaultValues ?? null;
        return { ...base, value };
      }
    }
  }

  private normalizeWeightingValues(
    rule: Option,
    formValue: unknown
  ): [string, number][] {
    const coerceToNumber = (input: unknown): number => {
      const parsed =
        typeof input === 'number'
          ? input
          : typeof input === 'string'
            ? Number(input)
            : NaN;

      return Number.isFinite(parsed) ? parsed : 0;
    };

    // Handle the weighting structure from your form
    if (formValue && typeof formValue === 'object' && !Array.isArray(formValue)) {
      const entries: [string, number][] = [];

      // Get labels from rule.defaultValues.values array
      const defaultValues = rule.defaultValues as any;
      const valuesArray = defaultValues?.values || [];

      // Create a map of index to label
      const indexToLabelMap = new Map<number, string>();
      valuesArray.forEach((item: any, idx: number) => {
        if (item && typeof item === 'object' && 'value' in item) {
          indexToLabelMap.set(idx, item.value);
        }
      });

      // Use the units input instead of trying to detect
      const currentUnits = this.units();

      // Sort keys to maintain consistent order
      const sortedKeys = Object.keys(formValue)
        .filter(key => !key.includes('_lock') && key !== 'slider' && !isNaN(parseInt(key, 10)))
        .sort((a, b) => {
          const numA = parseInt(a, 10);
          const numB = parseInt(b, 10);
          return numA - numB;
        });

      sortedKeys.forEach((key) => {
        const item = (formValue as Record<string, any>)[key];
        const optionIndex = parseInt(key, 10);

        // Handle both formats:
        // 1. Nested: { "0": { "0": 50, "0_lock": false } }
        // 2. Flat: { "0": 100, "1": 0 }
        let weight: any;

        if (typeof item === 'object' && item !== null) {
          // Nested format
          weight = item[key];
        } else {
          // Flat format
          weight = item;
        }

        if (weight !== undefined) {
          // Get label from map, fallback to key if not found
          const label = indexToLabelMap.get(optionIndex) || key;

          const numericWeight = coerceToNumber(weight);
          const normalizedWeight = this.units() === 'percent' ? numericWeight / 100 : numericWeight;

          entries.push([label, normalizedWeight]);
        }
      });

      return entries;
    }

    // Legacy array format support
    const mapValueWeightPairs = (
      entries: Array<{ value: string; weight: unknown }>
    ): [string, number][] => {
      return entries.map(entry => [
        entry.value,
        coerceToNumber(entry.weight),
      ]);
    };

    if (Array.isArray(formValue)) {
      return mapValueWeightPairs(
        formValue as Array<{ value: string; weight: unknown }>
      );
    }

    // Fall back to rule defaults
    const defaultConfig = rule.defaultValues;

    if (defaultConfig && typeof defaultConfig === 'object') {
      if ('values' in defaultConfig && Array.isArray(defaultConfig.values)) {
        return mapValueWeightPairs(defaultConfig.values);
      }

      if (Array.isArray(defaultConfig)) {
        return mapValueWeightPairs(defaultConfig);
      }
    }

    // Final fallback - return empty array
    return [];
  }

}
