import {AfterViewChecked, Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {MedicationFormComponent} from './medication-form/medication-form.component';
import {MedicationHelperService} from '../../../services/form-helpers/medication-helper.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-medications',
  imports: [
    MedicationFormComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.scss'
})
export class MedicationsComponent implements AfterViewChecked {
  @ViewChild('medicationsContainer') medicationsContainer?: ElementRef;

  form = input.required<FormGroup>();
  private medicationHelperService = inject(MedicationHelperService);
  private shouldScrollToBottom = false;

  get medicationFromArray(): FormArray {
    return this.form().get('medication') as FormArray;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.medicationsContainer) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  addMedication(): void {
    this.medicationHelperService.addMedication(this.medicationFromArray);
    this.shouldScrollToBottom = true;
  }

  onDeleteMedication(index: number): void {
    this.medicationHelperService.deleteMedication(index, this.medicationFromArray);
  }

  private scrollToBottom(): void {
    if (this.medicationsContainer) {
      const element = this.medicationsContainer.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}
