/**
 * Component for rendering cohort information including name, description, and patient count.
 * Provides form controls for basic cohort metadata configuration.
 */
import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {CohortService} from '../../../services/cohort.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cohort-info',
  imports: [
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './cohort-info.component.html',
  styleUrl: './cohort-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CohortInfoComponent {
  /** UI constants for labels and messages */
  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.SELECT_USE_CASE;

  /** Service for accessing cohort data */
  cohortService = inject(CohortService);
}
