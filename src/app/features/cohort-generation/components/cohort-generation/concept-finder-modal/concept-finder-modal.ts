/**
 * Modal dialog component for searching and selecting medical concepts.
 * Provides search functionality with system filtering and preset support.
 */
import {Component, Inject, inject, OnInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Concept} from '../../../models/cohort-generation-request-body';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ConceptSelect} from './concept-select/concept-select';
import {ConceptSearch} from './concept-search/concept-search';
import {SharedHttpErrorService} from '../../../../../shared/services/shared-http-error.service';
import {ErrorMessageComponent} from '../../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-concept-finder-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ConceptSelect,
    ConceptSearch,
    ErrorMessageComponent,
  ],
  templateUrl: './concept-finder-modal.html',
  styleUrl: './concept-finder-modal.scss',
})
export class ConceptFinderModal implements OnInit {
  /** Dialog reference for closing and returning data */
  private readonly dialogRef = inject(MatDialogRef<ConceptFinderModal>);

  /** Service for managing HTTP error display */
  protected sharedHttpErrorService = inject(SharedHttpErrorService);

  /** Currently selected system for concept search */
  selectedSystem?: { label: string; uri: string | null } = null;

  /** Signal storing the currently selected concept */
  selectedConcept = signal<Concept | null>(null);

  /** List of available systems for concept search */
  systemList: { label: string; uri: string | null }[] = [];

  /** Indicates if the dialog was opened from a preset */
  fromPreset: boolean = false;

  /** Hint text for the search term input */
  searchTermHint: string = '';

  /** Indicates if presets have been rendered */
  hasPresetsRendered = false;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ConceptFinderDialogData) {
  }

  /** Initializes the component with dialog data */
  ngOnInit(): void {
    this.systemList = this.dialogData.systemList;
    this.selectedSystem = this.dialogData.selectedSystem;
    this.fromPreset = this.dialogData.fromPreset;
    this.searchTermHint = this.dialogData.searchTermHint;
    this.hasPresetsRendered = this.dialogData.hasPresetsRendered;
  }

  /** Selects a concept and immediately applies it, closing the dialog */
  onSelectAndApplyConcept(concept: Concept){
    this.selectedConcept.set(concept);
    this.onSelect();
  }

  /** Sets the selected concept without closing the dialog */
  onSelectConcept(concept: Concept): void {
    this.selectedConcept.set(concept);
  }

  /** Closes the dialog and returns the selected concept */
  onSelect() {
    this.dialogRef.close(this.selectedConcept());
  }

  /** Closes the dialog without selecting a concept */
  onClose(): void {
    this.dialogRef.close(null);
  }
}

/**
 * Opens the concept finder modal dialog.
 * @param dialog - Material dialog service
 * @param sharedHttpErrorService - Service for managing HTTP errors
 * @param dialogData - Optional configuration data for the dialog
 * @returns Observable that emits the selected concept or null on close
 */
export function openConceptFinderModal(
  dialog: MatDialog,
  sharedHttpErrorService: SharedHttpErrorService,
  dialogData?: Partial<ConceptFinderDialogData>
) {
  const config: MatDialogConfig<ConceptFinderDialogData> = {
    autoFocus: true,
    minWidth: '50vw',
    maxWidth: '50vw',
    height: '90vh',
    maxHeight: '800px',
    disableClose: false,
    data: {
      fromPreset: dialogData?.fromPreset ?? false,
      systemList: dialogData?.systemList ?? [],
      selectedSystem: dialogData?.selectedSystem,
      searchTermHint: dialogData?.searchTermHint,
      hasPresetsRendered: dialogData.hasPresetsRendered ?? false,
    }
  };

  const dialogRef = dialog.open(ConceptFinderModal, config);

  // Clean up error state when dialog closes
  dialogRef.afterClosed().subscribe(() => {
    sharedHttpErrorService.hideErrorComponent();
  });

  return dialogRef.afterClosed();
}
