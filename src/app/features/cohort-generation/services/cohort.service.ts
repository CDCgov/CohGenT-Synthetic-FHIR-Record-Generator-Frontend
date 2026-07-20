import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {catchError, Observable} from 'rxjs';
import {FormRule} from '../models/use-case';
import {CohortGenerationRequestBody} from "../models/cohort-generation-request-body";
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';
import {UI_CONSTANTS} from '../../../constants/ui-constants';
import {CohortData} from '../models/cohort-data';

/**
 * Manages cohort generation state and API interactions.
 * Provides signal-based state management and HTTP methods for cohort generation.
 */
@Injectable({
  providedIn: 'root'
})
export class CohortService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  readonly DEFAULT_STRINGS = UI_CONSTANTS.COHORT_GENERATION;

  private _cohortData = signal<CohortData | null>(null);
  public readonly cohortData = this._cohortData.asReadonly();

  /**
   * Sets cohort data and automatically adds review/generate steps to the workflow.
   */
  public setCohortData(cohortData: CohortData | null) {
    if(cohortData) {
      this.addReviewAndGenerateSteps(cohortData.selectedUseCase.formRules);
    }
    this._cohortData.set(cohortData);
  }

  /**
   * Sends cohort generation request to the backend `/generate` endpoint.
   */
  generateCohort(requestBody: CohortGenerationRequestBody): Observable<any> {
    return this.http.post(`${this.environmentHandler.getBaseApiURL()}generate`, requestBody).pipe(
      catchError(error => this.sharedHttpErrorService.handleError(error, "Error generating cohort data.", 'generate-cohort-component'))
    );
  }

  /**
   * Converts summary data to CSV format via the `/convert-summary-to-csv` endpoint.
   */
  convertSummaryToCsv(summary: any): Observable<string> {
    return this.http.post(`${this.environmentHandler.getBaseApiURL()}convert-summary-to-csv`, summary, {
      responseType: 'text'
    }).pipe(
      catchError(error => this.sharedHttpErrorService.handleError(error, "Error converting data to CSV.", 'generation-summary-modal'))
    );
  }


  /**
   * Adds review and generate steps to form rules if they don't already exist.
   * Steps are appended at the end with incrementing step orders.
   */
  private addReviewAndGenerateSteps(formRules: FormRule[]) {
    const hasReviewRule = formRules.find(rule => rule.type === 'review');
    if(!hasReviewRule) {
      const stepOrder =formRules.map(rule => rule.stepOrder).reduce((max, current) => Math.max(max, current)) + 1;
      const formRule : FormRule = {
        stepOrder: stepOrder, type: 'review',
        title: this.DEFAULT_STRINGS.REVIEW_COHORT.STEP_TITLE,
        description : this.DEFAULT_STRINGS.REVIEW_COHORT.DESCRIPTION };
      formRules.push(formRule);
    }

    const hasGenerateRule = formRules.find(rule => rule.type === 'generate');

    if(!hasGenerateRule) {
      const stepOrder =formRules.map(rule => rule.stepOrder).reduce((max, current) => Math.max(max, current)) + 1;
      const formRule : FormRule = {
        stepOrder: stepOrder,
        type: 'generate',
        title: this.DEFAULT_STRINGS.CONFIRM_AND_GENERATE.STEP_TITLE,
        description : this.DEFAULT_STRINGS.CONFIRM_AND_GENERATE.DESCRIPTION}
      formRules.push(formRule);
    }
  }
}
