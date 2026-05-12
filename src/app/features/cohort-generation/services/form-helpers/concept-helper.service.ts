import {inject, Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConceptHelperService {
  private fb = inject(FormBuilder);

  buildFg(defaultSystem?:{ label: string, uri: string | null } | null) : FormGroup{
    let fg = this.fb.group({
      display:  new FormControl(),
      system:  new FormControl(),
      systemUri:  new FormControl({ value: '', disabled: true }),
      code:  new FormControl(),
    }, { validators: this.codeOrDisplayValidator()});
    this.subscribeToSystemValueChanges(fg);
    if (defaultSystem) {
      fg.controls.system.patchValue(defaultSystem.uri);
    }
    return fg;
  }

  codeOrDisplayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const code = formGroup.controls['code'].value;
      const display = formGroup.controls['display'].value;
      if (!(code || display)) {
        return { codeOrDisplayRequired: true };
      }
      return null;
    };
  }

  private subscribeToSystemValueChanges(fg: FormGroup) {
    fg?.get('system')?.valueChanges.subscribe((value) => {
      if (value === 'other') {
        fg.get('systemUri')?.patchValue('');
        fg.get('systemUri')?.enable();
      } else {
        fg.get('systemUri')?.patchValue(fg.get('system')!.value!);
        fg.get('systemUri')?.disable();
      }
    });
  }

}
