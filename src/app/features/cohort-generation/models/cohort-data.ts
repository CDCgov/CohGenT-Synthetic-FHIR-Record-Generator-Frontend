import {UseCaseMetadata} from './use-case-metadata';
import {UseCase} from './use-case';

export interface CohortData {
  selectedUseCase: UseCase;
  metadata: UseCaseMetadata;
  formValue?: any;
  currentStep?: number;
  isImported?: boolean; //this one will be triggered only when the cohort is being imported
}
