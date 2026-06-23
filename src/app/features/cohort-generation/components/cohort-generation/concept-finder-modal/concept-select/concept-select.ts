import {Component, inject, output, signal, Signal} from '@angular/core';
import {Concept} from '../../../../models/cohort-generation-request-body';
import {ConceptSearchService} from '../../../../services/concept-search-service';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {PresetCondition} from '../../../../models/preset-condition';

@Component({
  selector: 'app-concept-select',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './concept-select.html',
  styleUrl: './concept-select.scss',
})
export class ConceptSelect{
  onSelectConcept = output<Concept>();
  conceptSearchService = inject(ConceptSearchService);
  presetConditions: Signal<PresetCondition[]> = toSignal(
    this.conceptSearchService.getPresetConditions(),
    { initialValue: [] }
  );

  // Track expanded state by condition name
  expandedConditions = signal<Set<string>>(new Set());

  toggleExpanded(conditionName: string): void {
    this.expandedConditions.update(expanded => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(conditionName)) {
        newExpanded.delete(conditionName);
      } else {
        newExpanded.add(conditionName);
      }
      return newExpanded;
    });
  }

  isExpanded(conditionName: string): boolean {
    return this.expandedConditions().has(conditionName);
  }

}

