/**
 * Component for searching medical concepts by term and vocabulary system.
 * Provides search input, system/domain filtering, and displays paginated search results.
 */
import {Component, computed, inject, input, OnInit, output, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConceptSearchService} from '../../../../services/concept-search-service';
import {Concept} from '../../../../models/cohort-generation-request-body';
import {finalize} from 'rxjs/operators';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {SharedHttpErrorService} from '../../../../../../shared/services/shared-http-error.service';
import {ErrorMessageComponent} from '../../../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-concept-search',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatPaginator,
    MatSelect,
    ReactiveFormsModule,
    MatTableModule,
    MatHint,
    MatIcon,
    MatTooltip,
    ErrorMessageComponent
  ],
  templateUrl: './concept-search.html',
  styleUrl: './concept-search.scss',
})
export class ConceptSearch implements OnInit {
  /** List of available vocabulary systems for filtering search results */
  systemList = input.required<{ label: string; uri: string | null }[]>();

  /** Hint text to display in the search input field */
  searchTermHint = input<string>('');

  /** Currently selected vocabulary system for filtering */
  selectedSystem = input<{ label: string; uri: string | null }>(null);

  /** Indicates if preset conditions can be rendered */
  hasPresetsRendered = input<boolean>(false);

  /** Service for managing HTTP error display */
  protected sharedHttpErrorService = inject(SharedHttpErrorService);

  /** Computed list of systems excluding 'Other' for dropdown display ('Other' requires the user to manually enter the system UTI) */
  dropdownSystemList = computed(() =>
    this.systemList().filter(system => system.label !== 'Other')
  );

  /** List of available OMOP domain types for filtering */
  readonly omopDomainList: string[] = ['All', 'Condition', 'Drug', 'Measurement', 'Observation', 'Procedure', 'Specimen', 'Other'];

  /** Default columns to display in the results table */
  defaultColumns = ['code', 'display', 'system', 'domain'];

  /** Computed columns that includes 'hasPresets' column if presets are rendered */
  displayedColumns= computed(() => {
    if(this.hasPresetsRendered()){
      return [... this.defaultColumns, 'hasPresets']
    }
    else {
      return [... this.defaultColumns];
    }
  });

  /** Emits the selected concept when user clicks on a search result */
  onSelectConcept = output<Concept>();

  /** Form builder service for creating reactive forms */
  private readonly fb = inject(FormBuilder);

  /** Reactive form for concept search with system, domain, and search term fields */
  conceptFinderForm!: FormGroup;

  /** Service for performing concept searches */
  private readonly conceptSearchService = inject(ConceptSearchService);

  /** Indicates if a search is currently in progress */
  readonly isLoading = signal(false);

  /** Indicates if a search has been performed at least once */
  readonly hasSearched = signal(false);

  /** Tracks if the form has been submitted to show validation errors */
  readonly formSubmitted = signal(false);

  /** Material table data source for displaying search results */
  readonly dataSource = new MatTableDataSource<Concept>([]);

  /** Total number of search results available across all pages */
  totalRecords = 0;

  /** Number of results to display per page */
  pageSize = 10;

  /** Current page index for pagination */
  pageIndex = 0;

  /** Currently selected concept from the search results */
  selectedConcept = signal<Concept | null>(null);

  /** Initializes the component and sets up the search form */
  ngOnInit(): void {
    this.initializeForm();
  }

  /** Creates and configures the reactive form with validators and initial values */
  private initializeForm(): void {
    this.conceptFinderForm = this.fb.group({
      system: [''],
      domain: [this.omopDomainList[0]],
      searchTerm: ['', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'submit'
      }]
    });
    if(this.selectedSystem()){
      this.conceptFinderForm.get('system').patchValue(this.selectedSystem().uri)
    }

    // Reset formSubmitted when system field changes
    this.conceptFinderForm.get('system')?.valueChanges.subscribe(() => {
      this.formSubmitted.set(false);
    });
  }

  /** Handles form submission, validates input, and triggers concept search */
  onSubmit(): void {
    // Mark form as submitted
    this.formSubmitted.set(true);

    // Mark all fields as touched to show validation errors
    this.conceptFinderForm.markAllAsTouched();

    if (this.conceptFinderForm.invalid) {
      return;
    }

    // Clear any previous errors before new search
    this.sharedHttpErrorService.hideErrorComponent();

    this.pageIndex = 0;
    this.hasSearched.set(true);
    this.loadConcepts();
  }

  /** Performs the actual search API call with current form values and pagination */
  private loadConcepts(): void {
    this.dataSource.data = [];
    this.isLoading.set(true);

    const {searchTerm, system, domain} = this.conceptFinderForm.value;

    this.conceptSearchService
      .searchConcepts(searchTerm, system, domain, this.pageIndex, this.pageSize)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.conceptList;
          this.totalRecords = response.total;
        },
        error: (error) => {
          console.error('Error loading concepts:', error);
          this.dataSource.data = [];
          this.totalRecords = 0;
          // TODO: Add user-facing error notification
        }
      });
  }

  /** Handles pagination changes and fetches results for the new page */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadConcepts();
  }

  /** Handles concept selection from the results table */
  onSelect(concept: Concept): void {
    this.selectedConcept.set(concept);
    this.onSelectConcept.emit(concept);
  }

  /** Getter for accessing the search term form control */
  get searchTermControl() {
    return this.conceptFinderForm.get('searchTerm');
  }

}
