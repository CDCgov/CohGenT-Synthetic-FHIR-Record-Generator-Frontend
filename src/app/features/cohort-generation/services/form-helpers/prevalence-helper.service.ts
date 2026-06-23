import {
  FormBuilder,
  Validators,
  FormGroup,
  NonNullableFormBuilder, FormControl
} from '@angular/forms';
import {inject, Injectable} from '@angular/core';
import {PrevalenceOption} from '../../models/use-case';

export type PrevalenceForm = {
  slider: FormControl<number>;
  value: FormControl<number>;
};

@Injectable({
  providedIn: 'root',
})
export class PrevalenceHelperService {
  private fb = inject(FormBuilder).nonNullable as NonNullableFormBuilder;

  getPrevalenceFg(option: PrevalenceOption): FormGroup<PrevalenceForm> {

    const fg =  this.fb.group<PrevalenceForm>({
      slider: this.fb.control(option.defaultValues * 100),
      value: this.fb.control(option.defaultValues * 100, {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      }),
    });
    this.setValueChangeSubscriptions(fg);

    return fg;
  }

  private setValueChangeSubscriptions(fg: FormGroup<PrevalenceForm>): void {
    const sliderCtrl = fg.controls.slider;
    const valueCtrl = fg.controls.value;

    // slider -> value
    sliderCtrl.valueChanges.subscribe((val) => {
      if (valueCtrl.value !== val) {
        valueCtrl.setValue(val, { emitEvent: false });
      }
    });

    // value -> slider
    valueCtrl.valueChanges.subscribe((val) => {
      if (sliderCtrl.value !== val) {
        sliderCtrl.setValue(val, { emitEvent: false });
      }
      const numericVal = Number(val);

      if (Number.isNaN(numericVal)) {
        fg.controls['value'].setValue(null, {emitEvent: false});
        fg.controls['slider'].setValue(0, {emitEvent: false});
      } else if (numericVal < 0) {
        const minValue = 0;
        fg.controls['value'].setValue(0, {emitEvent: false});
        fg.controls['slider'].setValue(minValue, {emitEvent: false});
      } else if (numericVal > 100) {
        const maxValue = 100;
        fg.controls['value'].setValue(maxValue, {emitEvent: false});
        fg.controls['slider'].setValue(maxValue, {emitEvent: false});
      } else {
        fg.controls['slider'].setValue(numericVal, {emitEvent: false});
      }
    });
  }
}
