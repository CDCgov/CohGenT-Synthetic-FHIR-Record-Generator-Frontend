/**
 * Component for displaying and selecting preset medical conditions.
 * Shows expandable/collapsible list of preset conditions with their associated concepts.
 */
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
    MatButton,
  ],
  templateUrl: './concept-select.html',
  styleUrl: './concept-select.scss',
})
export class ConceptSelect{
  /** Emits the selected concept when user clicks on a preset condition */
  onSelectConcept = output<Concept>();

  /** Service for fetching concepts */
  conceptSearchService = inject(ConceptSearchService);

  /** Signal containing the list of preset conditions loaded from the service */
  presetConditions: Signal<PresetCondition[]> = toSignal(
    this.conceptSearchService.getPresetConditions(),
    { initialValue: [] }
  );

  /** Tracks which preset concepts are currently expanded in the UI */
  expandedConditions = signal<Set<string>>(new Set());

  /** Toggles the expanded/collapsed state of a preset condition */
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

  /** Checks if a preset concept is currently expanded */
  isExpanded(conditionName: string): boolean {
    return this.expandedConditions().has(conditionName);
  }

}

