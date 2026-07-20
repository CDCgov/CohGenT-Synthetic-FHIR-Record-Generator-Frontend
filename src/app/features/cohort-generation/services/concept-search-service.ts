import {inject, Injectable} from '@angular/core';
import {Concept} from '../models/cohort-generation-request-body';
import {catchError, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EnvironmentHandlerService} from '../../../config/environment-handler.service';
import {SYSTEM_LIST} from '../../../constants/app-constants';
import {PresetCondition} from '../models/preset-condition';
import {SharedHttpErrorService} from '../../../shared/services/shared-http-error.service';

export interface PaginatedResponse {
  total: number;
  conceptList: Concept[];
}

@Injectable({
  providedIn: 'root',
})
export class ConceptSearchService {
  private http = inject(HttpClient);
  private environmentHandler = inject(EnvironmentHandlerService);
  private sharedHttpErrorService = inject(SharedHttpErrorService);
  readonly SYSTEM_LIST = SYSTEM_LIST;

  private getCodes(codes: {display: string, code: string, system: string}[]): Concept[]{
    if (!codes) {
      return []
    }
    return codes.map(code => {
      return {
        display: code.display,
        code: code.code,
        system: this.SYSTEM_LIST.find(v=> v.uri == code.system).label,
        systemUri: code.system,
      }
    })
  }

  getPresetConditions(): Observable<PresetCondition[]> {
    // Removed caching for testing - create fresh observable each time
    return this.http
      .get<any>(`${this.environmentHandler.getBaseApiURL()}presets/condition`)
      .pipe(
        map(response => {
          const result : PresetCondition[] = response.conditionList.map((el: any) => {
              return{
                name: el.name,
                primaryCodes: this.getCodes(el.primaryCodes),
                secondaryCodes: this.getCodes(el.secondaryCodes),
              }
            }
          );
          return result;
        }),
        catchError(error => this.sharedHttpErrorService.handleError(error, undefined, 'concept-finder-modal'))
      );
  }

  /**
   * Search concepts with filtering and pagination
   * @param searchTerm - The term to search for in code and display fields
   * @param systemUri - The system URI to filter by (optional)
   * @param page - Zero-based page index
   * @param pageSize - Number of items per page
   */
  searchConcepts(
    searchTerm: string,
    systemUri: string | null,
    domain: string | null,
    page: number,
    pageSize: number
  ): Observable<PaginatedResponse> {
    const body = this.buildSearchBody(searchTerm, systemUri, domain, page, pageSize);
    const url = `${this.environmentHandler.getBaseApiURL()}terminology/search`;

    return this.http.post<any>(url, body).pipe(
      map(response => this.mapToPaginatedResponse(response)),
      catchError(error => this.sharedHttpErrorService.handleError(error, undefined, 'concept-finder-modal'))
    );
  }

  /**
   * Build HTTP request body for concept search
   */
  private buildSearchBody(
    searchTerm: string,
    systemUri: string | null,
    domain: string | null,
    page: number,
    pageSize: number
  ): any {
    const body: any = {
      term: searchTerm.trim(),
      page: page + 1,  // API expects 1-based page index
      count: pageSize
    };

    if (systemUri) {
      body.system = systemUri;
    }
    if (domain && domain.toLowerCase() !== 'all') {
      body.domain = domain.trim().toLowerCase();
    }

    return body;
  }

  /**
   * Map API response to PaginatedResponse format
   */
  private mapToPaginatedResponse(response: any): PaginatedResponse {
    const conceptList = response.results?.map((item: any) => this.mapToConcept(item)) || [];
    return {
      conceptList,
      total: response.total || 0
    };
  }

  /**
   * Map API concept item to Concept model
   */
  private mapToConcept(item: any): Concept {
    const systemLabel = this.SYSTEM_LIST.find(system => system.uri === item.system)?.label;

    return {
      display: item.name || '',
      system: systemLabel,
      systemUri: item.system || '',
      code: item.code || '',
      hasPresets: item.hasPresets,
      domain: item.domain || ''
    };
  }

}
