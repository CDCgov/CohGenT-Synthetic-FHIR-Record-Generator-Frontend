import {UseCaseMetadata} from './use-case-metadata';
import {UseCase} from './use-case';

/**
 * Represents the complete state of a cohort generation session.
 * This interface encapsulates all data needed to manage, persist, and restore
 * a cohort generation workflow.
 */
export interface CohortData {
  /**
   * The selected use case definition containing form rules and configuration.
   * Defines the structure of the cohort generation form.
   */
  selectedUseCase: UseCase;

  /**
   * Metadata about the cohort including name, description, and time period.
   * Contains cohort name, start date, end date, and until date for the event period.
   */
  metadata: UseCaseMetadata;

  /**
   * The form values for restoring a previously saved cohort configuration.
   * Used when importing a cohort from file.
   * Contains the complete form state including all user inputs.
   */
  formValue?: any;

  /**
   * Current step index in the multi-step form workflow.
   * Tracks which step the user is currently on in the stepper component.
   */
  currentStep?: number;

  /**
   * Optional flag indicating whether this cohort was imported from a file.
   * When true, triggers special handling such as navigating to the Review step.
   * Only set to true during the import cohort workflow.
   */
  isImported?: boolean;
}
