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

  useCases: Signal<UseCase[] | undefined>;
  useCasesService: UseCasesService = inject(UseCasesService);
  cohortService: CohortService = inject(CohortService);

  constructor() {
    this.useCases = this.useCasesService.getUseCases();
  }
}
