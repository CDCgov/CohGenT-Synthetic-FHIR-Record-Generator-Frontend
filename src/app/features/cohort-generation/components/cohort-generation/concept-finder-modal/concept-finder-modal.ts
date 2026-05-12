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
  ],
  templateUrl: './concept-finder-modal.html',
  styleUrl: './concept-finder-modal.scss',
})
export class ConceptFinderModal implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ConceptFinderModal>);
  selectedSystem?: { label: string; uri: string | null } = null;
  selectedConcept = signal<Concept | null>(null);
  systemList: { label: string; uri: string | null }[] = [];
  fromPreset: boolean = false;
  searchTermHint: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: ConceptFinderDialogData) {
  }

  ngOnInit(): void {
    this.systemList = this.dialogData.systemList;
    this.selectedSystem = this.dialogData.selectedSystem;
    this.fromPreset = this.dialogData.fromPreset;
    this.searchTermHint = this.dialogData.searchTermHint;
  }
  onSelectAndApplyConcept(concept: Concept){
    this.selectedConcept.set(concept);
    this.onSelect();
  }

  onSelectConcept(concept: Concept): void {
    this.selectedConcept.set(concept);
  }

  onSelect() {
    this.dialogRef.close(this.selectedConcept());
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}

export function openConceptFinderModal(
  dialog: MatDialog,
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
      searchTermHint: dialogData?.searchTermHint
    }
  };

  return dialog.open(ConceptFinderModal, config).afterClosed();
}
