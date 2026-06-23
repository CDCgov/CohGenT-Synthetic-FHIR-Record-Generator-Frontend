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
import {ConceptFormComponent} from '../../generic-forms/concept-form/concept-form.component';
import {MatCardModule} from '@angular/material/card';
import {AdditionalDataHelperService} from '../../../../services/form-helpers/additional-data-helper.service';
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {OnsetTimeRangeComponent} from '../../generic-forms/onset-time-range/onset-time-range.component';
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
  @ViewChild('proceduresContainer') proceduresContainer?: ElementRef;
  @ViewChild('radiologyContainer') radiologyContainer?: ElementRef;
  @ViewChild('labObservationsContainer') labObservationsContainer?: ElementRef;

  additionalDataFg = input.required<FormGroup>();
  tempFormValueStorage = input<any>();
  protected readonly Number = Number;
  utils= inject(Utils)

  additionalDataHelperSeries = inject(AdditionalDataHelperService);


  private shouldScrollToProcedures = false;
  private shouldScrollToRadiology = false;
  private shouldScrollToLabObservations = false;

  labObservationButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'labResult');
    return labResult?.buttonLabel ?? '';
  });

  procedureButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'procedure');
    return labResult?.buttonLabel ?? '';
  });

  radiologyButtonLabel = computed(() => {
    const additionalData = this.additionalDataHelperSeries.additionalEntities() ?? [];
    const labResult = additionalData.find(el => el.entityId === 'radiology');
    return labResult?.buttonLabel ?? '';
  });


  onSave = output();
  onCancel = output();
  protected readonly FormGroup = FormGroup;
  protected readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;
  readonly UI_CONSTANTS = UI_CONSTANTS.COHORT_GENERATION.ADDITIONAL_DATA;
  currentActiveFormGroupTracker = signal<string | null>(null);

  getFormArrayByName(fg: any, nameOrPath: string | string[]) {
    return fg.get(nameOrPath) as FormArray;
  }

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

  addProcedure(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addProcedure(additionalDataFg);
    this.shouldScrollToProcedures = true;
    this.currentActiveFormGroupTracker.set('procedure');
  }

  addRadiologyReport(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addRadiologyReport(additionalDataFg);
    this.shouldScrollToRadiology = true;
    this.currentActiveFormGroupTracker.set('radiology');
  }

  addObservation(additionalDataFg: FormGroup) {
    this.additionalDataHelperSeries.addObservation(additionalDataFg);
    this.shouldScrollToLabObservations = true;
    this.currentActiveFormGroupTracker.set('observation');
  }

  onDeleteEventDataItem(index: number, additionalDataFg: FormGroup, name: string) {
    this.additionalDataHelperSeries.deleteEventData(index, additionalDataFg, name);
  }

  getControls(fg: FormGroup, path: string[]) {
    return fg.get(path) as FormArray;
  }

  onCancelEventSetEdit(){
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

  onSaveEventSet() {
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


  private scrollToContainer(container: ElementRef): void {
    if (container) {
      const element = container.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }


}
