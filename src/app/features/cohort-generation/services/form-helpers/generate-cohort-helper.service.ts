import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  generateRandom10DigitNumber(): number {
    // Generate a random number between 1000000000 (inclusive) and 9999999999 (inclusive)
    const min = 1000000000; // Smallest 10-digit number
    const max = 9999999999; // Largest 10-digit number

    // Math.random() returns a float between 0 (inclusive) and 1 (exclusive)
    // Scale it to the desired range and then round down to get an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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


