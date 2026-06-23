import { Injectable } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Utils {

  /**
   * Recursively checks if all controls in a FormGroup or FormArray are touched
   */
  areAllControlsTouched(formGroup: FormGroup | FormArray): boolean {
    let allTouched = true;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup || control instanceof FormArray) {
        allTouched = allTouched && this.areAllControlsTouched(control);
      } else {
        allTouched = allTouched && (control?.touched ?? false);
      }
    });

    return allTouched;
  }

  /**
   * Recursively finds all invalid controls in a FormGroup or FormArray
   */
  getInvalidControls(formGroup: FormGroup | FormArray, path: string = ''): any[] {
    const invalidControls: any[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      const currentPath = path ? `${path}.${key}` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidControls.push(...this.getInvalidControls(control, currentPath));
      } else if (control && control.invalid) {
        invalidControls.push({
          path: currentPath,
          errors: control.errors,
          value: control.value,
          touched: control.touched
        });
      }
    });

    return invalidControls;
  }

  /**
   * Recursively marks all controls in a FormGroup or FormArray as touched
   * This ensures validation errors display for all nested controls
   */
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Recursively extracts all form values including disabled controls.
   *
   * Unlike FormGroup.getRawValue() which only works at the top level,
   * this method recursively processes nested FormArrays and FormGroups
   * to ensure all disabled controls are included in the extracted data.
   *
   * @param control - The AbstractControl (FormGroup, FormArray, or FormControl) to extract values from
   * @returns Object containing all form values including disabled controls, or the raw data if not a form control
   */
  getFormRawValueRecursive(control: any): any {
    if (control instanceof FormGroup) {
      const result: any = {};
      Object.keys(control.controls).forEach(key => {
        const childControl = control.controls[key];
        if (childControl instanceof FormArray) {
          result[key] = childControl.controls.map(c => this.getFormRawValueRecursive(c));
        } else if (childControl instanceof FormGroup) {
          result[key] = childControl.getRawValue();
        } else {
          result[key] = childControl.value;
        }
      });
      return result;
    } else if (control instanceof FormArray) {
      return control.controls.map(c => this.getFormRawValueRecursive(c));
    } else {
      // If it's already plain data (not a FormControl), return as-is
      return control;
    }
  }

  getFormControlsByName(fg: any, nameOrPath: string | string[]) {
    return fg.get(nameOrPath) as FormArray;
  }
}
