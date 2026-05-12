import {Component, effect, inject, input} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatInput, MatLabel} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {UseCase} from '../../../models/use-case';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {UseCaseMetadata} from '../../../models/use-case-metadata';
import {CohortService} from '../../../services/cohort.service';
import {UI_CONSTANTS} from '../../../../../constants/ui-constants';
import {MatIcon} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-use-case-selection',
  imports: [
    MatCardModule,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerToggle,
    MatSelectModule,
    MatButton,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './use-case-selection.component.html',
  styleUrls: ['./use-case-selection.component.scss', '../cohort-generation.component.scss'],
  providers: [provideNativeDateAdapter(), DatePipe],
})

export class UseCaseSelectionComponent {

  useCaseList = input.required<UseCase[]>();
  private datePipe: DatePipe = inject(DatePipe);
  useCaseSelectionForm: FormGroup;
  cohortService = inject(CohortService);
  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.SELECT_USE_CASE;
  readonly ERROR_MSG = UI_CONSTANTS.ERROR_MSG;
  readonly minDate = new Date('1970-01-01');
  readonly maxDate = new Date('2071-01-01'); //effective date here is 2070-12-31
  protected readonly Validators = Validators;

  constructor() {
    this.useCaseSelectionForm = new FormGroup({
      cohortName: new FormControl(null, [Validators.required]),
      start: new FormControl(null, [Validators.required, this.dateRangeValidator.bind(this)]),
      end: new FormControl(null, [Validators.required, this.dateRangeValidator.bind(this)]),
      until: new FormControl(null, [this.dateRangeValidator.bind(this)]),
      useCase: new FormControl(null, [Validators.required]),
    });

    // Trigger validation when dates change
    this.useCaseSelectionForm.get('start')!.valueChanges.subscribe(() => {
      this.useCaseSelectionForm.get('end')!.updateValueAndValidity({emitEvent: false});
      this.useCaseSelectionForm.get('until')!.updateValueAndValidity({emitEvent: false});
    });

    this.useCaseSelectionForm.get('end')!.valueChanges.subscribe(() => {
      this.useCaseSelectionForm.get('start')!.updateValueAndValidity({emitEvent: false});
      this.useCaseSelectionForm.get('until')!.updateValueAndValidity({emitEvent: false});
    });

    effect(() => {
      if (this.useCaseList()) {
        this.useCaseSelectionForm.controls['useCase'].setValue(this.useCaseList()[0]);
      }
      //this.autoSelectUseCase()
    });
  }

  dateRangeValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Don't validate empty values
    }

    const date = new Date(control.value);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return { invalidDate: true };
    }

    // Check if date is before minimum
    if (date < this.minDate) {
      return { dateOutOfRange: { min: this.minDate, max: this.maxDate } };
    }

    // Check if date is after maximum
    if (date > this.maxDate) {
      return { dateOutOfRange: { min: this.minDate, max: this.maxDate } };
    }

    // Cross-field validation for start/end dates
    if (this.useCaseSelectionForm?.controls) {
      const controlName = Object.keys(this.useCaseSelectionForm.controls).find(
        key => this.useCaseSelectionForm.controls[key] === control
      );

      const start = this.useCaseSelectionForm.controls['start'].value;
      const end = this.useCaseSelectionForm.controls['end'].value;
      const until = this.useCaseSelectionForm.controls['until'].value;

      // Validate start date is before end date
      if (controlName === 'start' && start && end) {
        if (new Date(start) >= new Date(end)) {
          return { startDateInvalid: true };
        }
      }

      // Validate end date is after start date
      if (controlName === 'end' && start && end) {
        if (new Date(end) <= new Date(start)) {
          return { endDateInvalid: true };
        }
      }

      // Validate until date is after end date
      if (controlName === 'until' && until && end) {
        if (new Date(until) <= new Date(end)) {
          return { untilDateInvalid: true };
        }
      }
    }

    return null;
  };

  onSubmit() {
    if (this.useCaseSelectionForm.invalid) {
      this.useCaseSelectionForm.markAllAsTouched();
      return;
    }
    const cohortName = this.useCaseSelectionForm.controls?.['cohortName'].value.trim();
    const start = this.datePipe.transform(this.useCaseSelectionForm.controls?.['start'].value, 'yyyy-MM-dd')!;
    const end = this.datePipe.transform(this.useCaseSelectionForm.controls?.['end'].value, 'yyyy-MM-dd')!;
    const until = this.datePipe.transform(this.useCaseSelectionForm.controls?.['until'].value, 'yyyy-MM-dd')!;
    const metadata: UseCaseMetadata = {start: start, end: end, until: until, cohortName: cohortName};

    let selectedUseCase: UseCase = this.useCaseSelectionForm.controls?.['useCase'].value;
    this.cohortService.setCohortData({selectedUseCase: selectedUseCase, metadata: metadata});
  }

  //TODO delete
  private autoSelectUseCase() {
    const metadata = {start: '2020-01-09', end: '2022-11-11', until: '2022-12-11', cohortName: 'cohortName'};
    const selectedUseCase: UseCase = this.useCaseList()[0];
    setTimeout(() => {
      this.cohortService.setCohortData({selectedUseCase: selectedUseCase, metadata: metadata});
    }, 1000)
  }


}
