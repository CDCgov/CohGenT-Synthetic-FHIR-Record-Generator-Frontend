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
    MatHint
  ],
  templateUrl: './concept-search.html',
  styleUrl: './concept-search.scss',
})
export class ConceptSearch implements OnInit {
  systemList = input.required<{ label: string; uri: string | null }[]>();
  searchTermHint = input<string>('');
  selectedSystem = input<{ label: string; uri: string | null }>(null);
  dropdownSystemList = computed(() =>
    this.systemList().filter(system => system.label !== 'Other')
  );

  onSelectConcept = output<Concept>();

  private readonly fb = inject(FormBuilder);
  conceptFinderForm!: FormGroup;
  private readonly conceptSearchService = inject(ConceptSearchService);

  // Use signals for reactive state management
  readonly isLoading = signal(false);
  readonly hasSearched = signal(false);
  readonly formSubmitted = signal(false); // Track form submission

  readonly dataSource = new MatTableDataSource<Concept>([]);
  readonly displayedColumns = ['code', 'display', 'system'] as const;

  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  selectedConcept = signal<Concept | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.conceptFinderForm = this.fb.group({
      system: [''],
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

  onSubmit(): void {
    // Mark form as submitted
    this.formSubmitted.set(true);

    // Mark all fields as touched to show validation errors
    this.conceptFinderForm.markAllAsTouched();

    if (this.conceptFinderForm.invalid) {
      return;
    }

    this.pageIndex = 0;
    this.hasSearched.set(true);
    this.loadConcepts();
  }

  private loadConcepts(): void {
    this.dataSource.data = [];
    this.isLoading.set(true);
    this.toggleFormControls(false); // Disable form controls

    const {searchTerm, system} = this.conceptFinderForm.value;

    this.conceptSearchService
      .searchConcepts(searchTerm, system, this.pageIndex, this.pageSize)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.toggleFormControls(true); // Re-enable form controls
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

  private toggleFormControls(enable: boolean): void {
    const searchTermControl = this.conceptFinderForm.get('searchTerm');
    const systemControl = this.conceptFinderForm.get('system');

    if (enable) {
      searchTermControl?.enable();
      systemControl?.enable();
    } else {
      searchTermControl?.disable();
      systemControl?.disable();
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadConcepts();
  }

  onSelect(concept: Concept): void {
    this.selectedConcept.set(concept);
    this.onSelectConcept.emit(concept);
  }

  get searchTermControl() {
    return this.conceptFinderForm.get('searchTerm');
  }

}
