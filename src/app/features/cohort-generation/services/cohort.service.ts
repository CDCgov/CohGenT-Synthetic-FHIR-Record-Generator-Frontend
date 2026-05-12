import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {catchError, Observable, throwError} from 'rxjs';
import {FormRule} from '../models/use-case';
import {CohortGenerationRequestBody} from "../models/cohort-generation-request-body";
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';
import {UI_CONSTANTS} from '../../../constants/ui-constants';
import {CohortData} from '../models/cohort-data';

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
  public setCohortData(cohortData: CohortData | null) {
    if(cohortData) {
      this.addReviewAndGenerateSteps(cohortData.selectedUseCase.formRules);
    }
    this._cohortData.set(cohortData);
  }

  generateCohort(requestBody: CohortGenerationRequestBody): Observable<any> {
    return this.http.post(`${this.environmentHandler.getBaseApiURL()}generate`, requestBody).pipe(
      catchError(error => {
        this.sharedHttpErrorService.setErrorMessage("Error generating cohort data.");
        return throwError(error);
      })
    );
  }

  convertSummaryToCsv(summary: any): Observable<string> {
    return this.http.post(`${this.environmentHandler.getBaseApiURL()}convert-summary-to-csv`, summary, {
      responseType: 'text'
    }).pipe(
      catchError(error => {
        this.sharedHttpErrorService.setErrorMessage("Error converting data to CSV.");
        return throwError(error);
      })
    );
  }


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
