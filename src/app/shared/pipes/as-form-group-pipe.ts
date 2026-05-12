
import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'asFormGroup',
  standalone: true // Remove this line if not using standalone components
})
export class AsFormGroupPipe implements PipeTransform {

  transform(control: AbstractControl | null): FormGroup {
    if (control instanceof FormGroup) {
      return control;
    }
    return new FormGroup({});
  }
}
