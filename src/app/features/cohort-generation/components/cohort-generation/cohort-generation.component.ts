/**
 * Root component for the cohort generation feature.
 * Manages the overall cohort generation workflow including use case selection and form management.
 * Coordinates between use case selection and the multi-step form process.
 */
import {Component, effect, inject, Signal} from '@angular/core';
import {UseCaseSelectionComponent} from './use-case-selection/use-case-selection.component';
import {UseCase} from '../../models/use-case';
import {UseCasesService} from '../../services/use-cases.service';
import {FormManagerComponent} from './form-manager/form-manager.component';
import {CohortService} from '../../services/cohort.service';

@Component({
  selector: 'app-cohort-generation.component',
  imports: [
    UseCaseSelectionComponent,
    FormManagerComponent,
  ],
  templateUrl: './cohort-generation.component.html',
  styleUrl: './cohort-generation.component.scss'
})
export class CohortGenerationComponent {

  /** Signal containing the available use cases loaded from the service */
  useCases: Signal<UseCase[] | undefined>;

  /** Service for managing use cases and their configurations */
  useCasesService: UseCasesService = inject(UseCasesService);

  /** Service for cohort generation operations and API interactions */
  cohortService: CohortService = inject(CohortService);

  /** Constructor that initializes the use cases signal by fetching from the service */
  constructor() {
    this.useCases = this.useCasesService.getUseCases();
  }
}
