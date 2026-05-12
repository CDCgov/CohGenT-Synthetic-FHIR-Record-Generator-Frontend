import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenerateCohortHelperService {
  private fb = inject(FormBuilder);

  readonly bundleTypes = [
    {display: "Transaction", value: "transaction" }
  ]

  readonly outputFormats = [
    {display: "FHIR JSON Bundle", value: "json" },
    {display: "Bulk FHIR NDJSON", value: "ndjson"}
  ]

  buildFg(value?: any): FormGroup{
    const numberOfPatientsFg = this.buildNumberOfPatientsFg()
    const fg =  new FormGroup({
      seed: new FormControl(this.generateRandom10DigitNumber(), [Validators.required, Validators.min(0), Validators.max(9999999999)]),
      numberOfPatients: numberOfPatientsFg,
      bundleType: new FormControl(this.bundleTypes[0].value),
      outputFormat: new FormControl(this.outputFormats[0].value),
    });
    if (value){
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
      'input': new FormControl(1, [Validators.required,  Validators.min(1), Validators.max(50)]),
    });
    fg.controls['slider'].valueChanges.subscribe(value => {
      fg.controls['input'].setValue(value, { emitEvent: false });
    });
    fg.controls['input'].valueChanges.subscribe(value => {
      fg.controls['slider'].setValue(value, { emitEvent: false });
    });
    return fg;
  }

}


