import {Component, inject, Signal, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {CohortService} from '../../../features/cohort-generation/services/cohort.service';
import {SharedHttpErrorService} from '../../services/shared-http-error.service';
import {CohortData} from '../../../features/cohort-generation/models/cohort-data';
import {UI_CONSTANTS} from '../../../constants/ui-constants';
import {MatExpansionModule} from '@angular/material/expansion';
import {SampleDTO, SamplesService} from '../../../features/cohort-generation/services/samples.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-landing-page',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon,
    MatExpansionModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  private router = inject(Router);
  private cohortService  = inject(CohortService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  private samplesService = inject(SamplesService);
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.LANDING_PAGE;
  samples: Signal<SampleDTO[]> = signal(null);
  displayedColumns = ['name', 'description', 'action']

  constructor() {
    this.cohortService.setCohortData(null);
    this.sharedHttpErrorService.hideErrorComponent();
    this.samples = this.samplesService.getSamples();
  }

  onCreateCohort() {
    this.router.navigate(['generate']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input || !input.files || input.files.length === 0) {
      console.error("Unable to upload file");
      return;
    }

    const file: File = input.files[0];

    if (!file) {
      console.error("Unable to upload file");
    }

    if (file.size > 100000) {
      console.error("File is too big!");
    }

    const fileReader = new FileReader();

    fileReader.onload = () => this.handleFileLoad(fileReader);
    fileReader.onerror = (error) => console.error(error);

    fileReader.readAsText(file, "UTF-8");
  }

  private handleFileLoad(fileReader: FileReader): void {
    try {
      this.sharedHttpErrorService.hideErrorComponent();
      let data = JSON.parse(fileReader.result as string) as CohortData;
      data.isImported = true;
      this.cohortService.setCohortData(data);
      this.router.navigate(['generate']);
    } catch (error) {
      this.sharedHttpErrorService.setErrorMessage("Error parsing file content");
      this.sharedHttpErrorService.showErrorComponent();

      console.error("Error parsing file content");
    }
  }

  protected onLoadUseCase(cohort: CohortData) {
    try {
      cohort.isImported = true;
      this.cohortService.setCohortData(cohort);
      this.router.navigate(['generate']);
    } catch (error) {
      this.sharedHttpErrorService.setErrorMessage("Error parsing file content");
      this.sharedHttpErrorService.showErrorComponent();
      console.error("Error parsing file content");
    }
  }
}
