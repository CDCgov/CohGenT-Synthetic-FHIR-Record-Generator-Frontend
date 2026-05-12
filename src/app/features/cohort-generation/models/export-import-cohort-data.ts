import {UseCase} from './use-case';
import {UseCaseMetadata} from './use-case-metadata';

export interface ExportImportCohortData {
  useCase: UseCase;
  metadata: UseCaseMetadata;
  formValue: any;
}
