import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {AdditionalDataHelperService} from '../../../services/form-helpers/additional-data-helper.service';
import {ViewEventSetComponent} from './view-event-set/view-event-set.component';
import {AddEditEventSetComponent} from './add-edit-event-set/add-edit-event-set.component';

@Component({
  selector: 'app-additional-data',
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ViewEventSetComponent,
    AddEditEventSetComponent,
    ViewEventSetComponent,
  ],
  templateUrl: './additional-data.component.html',
  styleUrl: './additional-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalDataComponent {
  form = input.required<FormGroup>();
  additionalDataHelperService = inject(AdditionalDataHelperService);
  editIndex: number = -1;
  isEditing: boolean = false;
  tempFormValueStorage : any | null = null;

  //TODO refactor to computed signal
  get additionalDataFormArray(): FormArray {
    return this.form().get('additional-data-time-series') as FormArray;
  }

  isFormGroup(control: AbstractControl): control is FormGroup {
    return control instanceof FormGroup;
  }

  addEvent(additionalDataFormArray: FormArray) {
    this.additionalDataFormArray.updateValueAndValidity();
    if(this.additionalDataFormArray.valid) {
      this.additionalDataHelperService.addEvent(additionalDataFormArray);
      this.editIndex = additionalDataFormArray.controls.length - 1;
      this.isEditing = true;
    }
  }

  onDeleteEventSet(index: number) {
    this.additionalDataFormArray.controls.splice(index, 1);
    this.additionalDataFormArray.updateValueAndValidity();
  }

  onEditEventSet(index: number) {
    this.editIndex = index;
    this.tempFormValueStorage = JSON.parse(JSON.stringify(this.additionalDataFormArray.controls?.[index].value));
    this.isEditing = true;
  }

  onSave(additionalDataFg: FormGroup) {
    this.isEditing = false;
    this.editIndex = -1;
    this.additionalDataFormArray.updateValueAndValidity();
    if(additionalDataFg.valid){
      additionalDataFg.get(['deleteOnCancel']).patchValue(false);
    }
  }

  onCancel(additionalDataFg: FormGroup, index: number) {
    // if the last element is canceled, just delete it
    if(additionalDataFg.get('deleteOnCancel').value == true) {
      this.additionalDataFormArray.controls.splice(index, 1);
    }
    else{
      additionalDataFg.patchValue(this.tempFormValueStorage);
    }
    this.additionalDataFormArray.updateValueAndValidity();
    this.isEditing = false;
    this.editIndex = -1;
  }
}
