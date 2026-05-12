import {Component, inject, input, output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {GenerateCohortHelperService} from '../../../services/form-helpers/generate-cohort-helper.service';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';


@Component({
  selector: 'app-generate-cohort',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSlider,
    MatSliderThumb,
    MatButton,
    MatSelectModule,
    MatCardModule,
    MatIcon,
    MatTooltip,
    DatePipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  templateUrl: './generate-cohort.component.html',
  styleUrls: ['./generate-cohort.component.scss', '../cohort-generation.component.scss'],
})
export class GenerateCohortComponent {
  form = input.required<FormGroup>();
  cohortGeneratedSuccessfully = input.required<boolean>();
  cohortInfo = input.required<{timestamp: string, name: string} | null>();

  formSubmit = output();
  onDownloadCohort = output();
  onViewSummary = output();

  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.CONFIRM_AND_GENERATE;
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG

  generateCohortHelperService: GenerateCohortHelperService = inject(GenerateCohortHelperService);

  onSubmit() {
    this.formSubmit.emit()
  }

  onGenerateNewRandomSeed() {
    this.form().controls['seed'].patchValue(this.generateCohortHelperService.generateRandom10DigitNumber());
  }

}
