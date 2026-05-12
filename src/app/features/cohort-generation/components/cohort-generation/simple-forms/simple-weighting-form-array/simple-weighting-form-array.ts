import {Component, inject, input, OnDestroy} from '@angular/core';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {WeightingHelperService} from '../../../../services/form-helpers/weighting-helper.service';


@Component({
  selector: 'app-simple-weighting-form-array',
  imports: [
    MatIcon,
    MatTooltip,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatCheckbox,
    MatSuffix,
    MatError,
  ],
  templateUrl: './simple-weighting-form-array.html',
  styleUrl: './simple-weighting-form-array.scss',
})
export class SimpleWeightingFormArray implements OnDestroy {
  formArray = input<FormArray<FormGroup>>(new FormArray<FormGroup>([]));
  units = input<'decimal' | 'percent'>('percent');
  private weightingHelperService: WeightingHelperService = inject(WeightingHelperService);
  private weighingInputGlobalStorage: number | null = null;

  onToggleCheckbox(fg: FormGroup) {
    const currentLockState = fg.get(['lock'])?.value;
    fg.get(['lock'])?.patchValue(!currentLockState);
  }

  onFocus(index: number) {
    const fg = this.formArray().get([index]) as FormGroup;
    this.weighingInputGlobalStorage = fg.get(['weight'])?.value;
  }

  onBlur(index: number) {
    this.calculateWeights(index);
    this.weighingInputGlobalStorage = null;
  }

  calculateWeights(index: number) {
    this.formArray().updateValueAndValidity();
    if(!this.formArray().valid){
      console.warn("Invalid form array, cannot calculate weights!");
      return;
    }
    const fg = this.formArray().get([index]) as FormGroup;
    if (!fg?.dirty || this.weighingInputGlobalStorage == null) {
      return;
    }
    const previousValue = this.weighingInputGlobalStorage;
    const newValue = fg.get(['weight'])!.value;

    const multiplicationFactor = this.units() == 'percent' ? 1 : 100;
    const inputValues = this.formArray().controls.map((control, i) => {
      if (i == index) {
        return {lock: false, value: Math.round(previousValue * multiplicationFactor)};
      } else {
        return {
          lock: control.controls['lock'].getRawValue(),
          value: control.controls['weight'].getRawValue() * multiplicationFactor
        };
      }
    })

    const result = this.weightingHelperService.getAdjustedWeights(inputValues, index, newValue);
    this.formArray().controls.forEach((control, i) => {
      if (!control.controls['lock'].getRawValue()) {
        control.controls['weight'].setValue(result[i].value, {emitEvent: false});
      }
    });
  }

  onDelete(index: number) {
    const fg = this.formArray().get([index]) as FormGroup;
    fg.get(['lock'])?.setValue(false);
    this.weighingInputGlobalStorage = fg.get(['weight'])?.getRawValue();
    fg.get(['weight'])?.setValue(0);
    fg.markAsDirty();
    this.calculateWeights(index);
    this.formArray().controls.splice(index, 1);
    //If there is one element ion the array its value mus always be 100/1
    if(this.formArray().length == 1) {
      this.formArray().get([0, 'weight'])?.setValue(this.units() == 'percent' ? 100 : 1, {emitEvent: false});
      this.formArray().get([0, 'value']).enable({emitEvent: false});
    }
  }

  ngOnDestroy() {
    this.weighingInputGlobalStorage = null;
  }
}
