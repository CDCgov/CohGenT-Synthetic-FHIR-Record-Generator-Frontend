import {Component, inject} from '@angular/core';
import {CohortService} from '../../../services/cohort.service';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cohort-info',
  imports: [
    MatIcon
  ],
  templateUrl: './cohort-info.component.html',
  styleUrl: './cohort-info.component.scss'
})
export class CohortInfoComponent {
  cohortService: CohortService = inject(CohortService);
  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.SELECT_USE_CASE;

}
