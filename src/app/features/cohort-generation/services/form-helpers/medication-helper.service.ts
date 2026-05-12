import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConceptHelperService} from './concept-helper.service';
import {SYSTEM_LIST} from '../../../../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class MedicationHelperService {
  private fb = inject(FormBuilder);
  private conceptHelperService = inject(ConceptHelperService);
  readonly DEFAULT_SYSTEM = SYSTEM_LIST.find(system => system.label === "RxNorm");

  addMedication(fgArray: FormArray) {
    fgArray.push(this.fb.group({
        dosage: new FormControl(''),
        concept: this.conceptHelperService.buildFg(this.DEFAULT_SYSTEM)
      }
    ));
  }

  deleteMedication(i: number, medicationFromArray: FormArray) {
    medicationFromArray.removeAt(i);
  }

  importMedications(fgArray: FormArray, importData: any[]) {
    importData.forEach((item) => {
      let medicationFg = new FormGroup({
        concept: this.conceptHelperService.buildFg(),
        dosage: new FormControl(),
      });
      medicationFg.patchValue(item);
      fgArray.push(medicationFg);
    })
  }

}
