import {Component, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatInput} from "@angular/material/input";
import {TIME_PERIOD_UNIT_LIST} from '../../../../../../constants/app-constants';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-onset-time-range',
    imports: [
        FormsModule,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatOption,
        MatSelect,
        ReactiveFormsModule
    ],
  templateUrl: './onset-time-range.component.html',
  styleUrls: ['../../cohort-generation.component.scss']
})
export class OnsetTimeRangeComponent {
  form = input.required<FormGroup>();
  protected readonly TIME_PERIOD_UNIT_LIST = TIME_PERIOD_UNIT_LIST;
}
