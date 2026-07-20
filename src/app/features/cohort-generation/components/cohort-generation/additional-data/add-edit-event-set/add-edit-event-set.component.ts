/**
 * Component for adding or editing event sets containing clinical data.
 * Manages observations, procedures, radiology reports, and their time ranges with auto-scroll functionality.
 */
import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ConceptFormComponent} from '../../form-primitives/concept-form/concept-form.component';
import {MatCardModule} from '@angular/material/card';
import {AdditionalDataHelperService} from '../../../../services/form-helpers/additional-data-helper.service';
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {OnsetTimeRangeComponent} from '../../form-primitives/onset-time-range/onset-time-range.component';
import {AsFormGroupPipe} from '../../../../../../shared/pipes/as-form-group-pipe';
import {MatDivider} from '@angular/material/list';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatTooltip} from '@angular/material/tooltip';
import {Utils} from '../../../../services/utils.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Procedures} from './procedures/procedures';
import {RadiologyReports} from './radiology-reports/radiology-reports';
import {Observations} from './observations/observations';
import {SharedHttpErrorService} from '../../../../../../shared/services/shared-http-error.service';


@Component({
  selector: 'app-add-edit-event-set',
  imports: [
    ConceptFormComponent,
    FormsModule,
    MatButton,
    MatCardModule,
    MatIcon,
    ReactiveFormsModule,
    OnsetTimeRangeComponent,
    AsFormGroupPipe,
    MatDivider,
    MatCheckbox,
    MatTooltip,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    Procedures,
    RadiologyReports,
    Observations,
  ],
  templateUrl: './add-edit-event-set.component.html',
  styleUrl: './add-edit-event-set.component.scss',
})
export class AddEditEventSetComponent implements AfterViewChecked {
  /** Reference to procedures container for auto-scrolling */
  @ViewChild('proceduresContainer') proceduresContainer?: ElementRef;

  /** Reference to radiology container for auto-scrolling */
  @ViewChild('radiologyContainer') radiologyContainer?: ElementRef;

  /** Reference to lab observations container for auto-scrolling */
  @ViewChild('labObservationsContainer') labObservationsContainer?: ElementRef;

  /** Form group for the event set being edited */
  additionalDataFg = input.required<FormGroup>();

  /** Stores form values before editing to enable cancel functionality */
  tempFormValueStorage = input<any>();

  protected readonly Number = Number;

  /** Utility service for form operations */
  utils= inject(Utils)

  /** Service for managing additional data form operations */
  additionalDataHelperSeries = inject(AdditionalDataHelperService);

  /** Service for managing HTTP error display */
  sharedHttpErrorService = inject(SharedHttpErrorService);

  /** Flags to trigger auto-scroll after adding items */
  private shouldScrollToProcedures = false;
  private shouldScrollToRadiology = false;
  private shouldScrollToLabObservations = false;

  /** Computed button label for lab observations from entity configuration */
  labObservationButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'labResult');
    return labResult?.buttonLabel ?? '';
  });

  /** Computed button label for procedures from entity configuration */
  procedureButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'procedure');
    return labResult?.buttonLabel ?? '';
  });

  /** Computed button label for radiology from entity configuration */
  radiologyButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'radiology');
    return labResult?.buttonLabel ?? '';
  });

  /** Emits when save button is clicked */
  onSave = output();

  /** Emits when cancel button is clicked */
  onCancel = output();

  protected readonly FormGroup = FormGroup;
  protected readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;

  /** UI constants for labels and messages */
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;

  /** Tracks which type of item is currently being edited (observation, procedure, radiology) */
  currentActiveFormGroupTracker = signal<string | null>(null);

  /** Helper method to get a form array by name or path */
  getFormArrayByName(fg: any, nameOrPath: string | string[]) {
    return fg.get(nameOrPath) as FormArray;
  }

  /** Lifecycle hook to handle auto-scrolling after view updates */
  ngAfterViewChecked(): void {
    if (this.shouldScrollToProcedures && this.proceduresContainer) {
      this.scrollToContainer(this.proceduresContainer);
      this.shouldScrollToProcedures = false;
    }
    if (this.shouldScrollToRadiology && this.radiologyContainer) {
      this.scrollToContainer(this.radiologyContainer);
      this.shouldScrollToRadiology = false;
    }
    if (this.shouldScrollToLabObservations && this.labObservationsContainer) {
      this.scrollToContainer(this.labObservationsContainer);
      this.shouldScrollToLabObservations = false;
    }
  }

  /** Adds a new procedure to the event set and triggers auto-scroll */
  addProcedure(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addProcedure(additionalDataFg);
    additionalDataFg.get(['diagnosticPanel', 'includeDiagnosticReport']).disable();
    this.shouldScrollToProcedures = true;
    this.currentActiveFormGroupTracker.set('procedure');
  }

  /** Adds a new radiology report to the event set and triggers auto-scroll */
  addRadiologyReport(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addRadiologyReport(additionalDataFg);
    additionalDataFg.get(['diagnosticPanel', 'includeDiagnosticReport']).disable();
    this.shouldScrollToRadiology = true;
    this.currentActiveFormGroupTracker.set('radiology');
  }

  /** Adds a new observation to the event set and triggers auto-scroll */
  addObservation(additionalDataFg: FormGroup) {
    this.sharedHttpErrorService.hideErrorComponent();
    this.additionalDataHelperSeries.addObservation(additionalDataFg);
    this.shouldScrollToLabObservations = true;
    this.currentActiveFormGroupTracker.set('observation');
  }

  /** Deletes an event data item (observation, procedure, or radiology report) */
  onDeleteEventDataItem(index: number, additionalDataFg: FormGroup, name: string) {
    this.sharedHttpErrorService.hideErrorComponent();
    this.additionalDataHelperSeries.deleteEventData(index, additionalDataFg, name);
    if(!additionalDataFg.get('observations') && !additionalDataFg.get('radiologyList')){
      additionalDataFg.get(['diagnosticPanel', 'includeDiagnosticReport']).enable();
    }
  }

  /** Helper method to get form array controls by path */
  getControls(fg: FormGroup, path: string[]) {
    return fg.get(path) as FormArray;
  }

  /** Cancels editing, removes unsaved items, and restores previous values */
  onCancelEventSetEdit(){
    this.sharedHttpErrorService.hideErrorComponent();
    if(this.currentActiveFormGroupTracker() == 'observation'){
      const labObservationsFgArray = this.additionalDataFg().get('labObservations') as FormArray;
      this.removeControlsMarkedForDeletion(labObservationsFgArray);
    }
    else if(this.currentActiveFormGroupTracker() == 'radiology'){
      const radiologyFgArray = this.additionalDataFg().get('radiologyList') as FormArray;
      this.removeControlsMarkedForDeletion(radiologyFgArray);
    }
    else if(this.currentActiveFormGroupTracker() == 'procedure'){
      const proceduresFgArray = this.additionalDataFg().get('procedures') as FormArray;
      this.removeControlsMarkedForDeletion(proceduresFgArray);
    }
    this.additionalDataFg().patchValue(this.tempFormValueStorage(), {emitEvent: false});
    this.currentActiveFormGroupTracker.set(null);
    this.onCancel.emit();
  }

  /** Removes form controls marked for deletion on cancel */
  private removeControlsMarkedForDeletion(formArray: FormArray): void {
    if (!formArray || formArray.length === 0) {
      return;
    }

    // Keep controls where deleteOnCancel is NOT true
    const controlsToKeep = formArray.controls.filter(
      control => !control.get('deleteOnCancel')?.value
    );

    formArray.clear();
    controlsToKeep.forEach(control => formArray.push(control));

  }

  /** Saves the event set if valid and marks all items as saved */
  onSaveEventSet() {
    this.sharedHttpErrorService.hideErrorComponent();
    this.utils.markFormGroupTouched(this.additionalDataFg());
    this.additionalDataFg().updateValueAndValidity();
    if (this.additionalDataFg().valid) {
      if (this.currentActiveFormGroupTracker() == 'observation') {
        const labObservationsArray = this.additionalDataFg().get('labObservations') as FormArray;
        labObservationsArray.controls.forEach(control => {
          control.get('deleteOnCancel')?.patchValue(false, { emitEvent: false });
        });
      }
      if (this.currentActiveFormGroupTracker() == 'radiology') {
        const radiologyFgArray = this.additionalDataFg().get('radiologyList') as FormArray;
        radiologyFgArray.controls.forEach(control => {
          control.get('deleteOnCancel')?.patchValue(false, { emitEvent: false });
        });
      }
      if (this.currentActiveFormGroupTracker() == 'procedure') {
        const proceduresFgArray = this.additionalDataFg().get('procedures') as FormArray;
        proceduresFgArray.controls.forEach(control => {
          control.get('deleteOnCancel')?.patchValue(false, { emitEvent: false });
        });
      }
      this.currentActiveFormGroupTracker.set(null);
      this.onSave.emit();
    }
  }


  /** Scrolls to the specified container element */
  private scrollToContainer(container: ElementRef): void {
    if (container) {
      const element = container.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }


}
