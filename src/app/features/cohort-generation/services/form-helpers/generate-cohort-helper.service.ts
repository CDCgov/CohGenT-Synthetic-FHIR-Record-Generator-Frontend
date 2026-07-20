import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Helper service for managing cohort generation configuration forms.
 * Handles seed, patient count, bundle type, and output format settings.
 */
@Injectable({
  providedIn: 'root'
})
export class GenerateCohortHelperService {
  private fb = inject(FormBuilder);

  readonly bundleTypes = [
    {display: "Transaction", value: "transaction"}
  ]

  readonly outputFormats = [
    {display: "FHIR JSON Bundle", value: "json"},
    {display: "Bulk FHIR NDJSON", value: "ndjson"}
  ]

  /** Creates the cohort generation configuration FormGroup with seed and patient count. */
  buildFg(value?: any): FormGroup {
    const numberOfPatientsFg = this.buildNumberOfPatientsFg()
    const fg = new FormGroup({
      seed: new FormControl(this.generateRandom10DigitNumber(), [Validators.required, Validators.min(0), Validators.max(9999999999)]),
      numberOfPatients: numberOfPatientsFg,
      bundleType: new FormControl(this.bundleTypes[0].value),
      outputFormat: new FormControl(this.outputFormats[0].value),
    });
    if (value) {
      fg.patchValue(value);
    }
    return fg;
  }

  /** Generates a random 10-digit seed number for reproducible cohort generation. */
  generateRandom10DigitNumber(): number {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Creates synchronized slider and input controls for patient count (1-50). */
  private buildNumberOfPatientsFg() {
    let fg = this.fb.group({
      'slider': new FormControl(1),
      'input': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(50)]),
    });
    fg.controls['slider'].valueChanges.subscribe(value => {
      fg.controls['input'].setValue(value);
    });


    fg.controls['input'].valueChanges.subscribe((value: string | number) => {
      //Special case fro empty value case for
      if (value == '') {
        fg.controls['input'].setValue(null, {emitEvent: false});
        return;
      }

      //Handle numbers
      const numericVal = Number(value);
      if (Number.isNaN(numericVal)) {
        fg.controls['input'].setValue(null, {emitEvent: false});
        fg.controls['slider'].setValue(1, {emitEvent: false});
      } else if (numericVal == 0) {
        const minValue = 1;
        fg.controls['input'].setValue(minValue, {emitEvent: false});
        fg.controls['slider'].setValue(minValue, {emitEvent: false});
      } else if (numericVal > 50) {
        const maxValue = 50;
        fg.controls['input'].setValue(maxValue, {emitEvent: false});
        fg.controls['slider'].setValue(maxValue, {emitEvent: false});
      } else {
        fg.controls['slider'].setValue(numericVal, {emitEvent: false});
      }
    });
    return fg;
  }

}


