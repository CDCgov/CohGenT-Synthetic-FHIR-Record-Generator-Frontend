import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { CheckboxFormComponent } from './checkbox-form.component';
import { Option } from '../../../../models/use-case';

describe('CheckboxFormComponent (Vitest)', () => {
  let fixture: ComponentFixture<CheckboxFormComponent>;
  let component: CheckboxFormComponent;
  let testForm: FormGroup;
  let originalForm: FormGroup;
  let testControl: FormControl;
  let originalControl: FormControl;

  // Helper to create a minimal Option object with all required fields
  const dummyOption: Option = {
    label: 'Test Rule',
    ruleId: 'testRule',
    control: 'checkbox',
    // Add any other required fields from the Option interface if needed
  };

  beforeEach(async () => {
    // Create individual FormControls
    testControl = new FormControl('initial');
    originalControl = new FormControl('original');

    // Create forms with the controls
    testForm = new FormGroup({
      testRule: testControl,
    });

    originalForm = new FormGroup({
      testRule: originalControl,
    });

    await TestBed.configureTestingModule({
      imports: [
        CheckboxFormComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatChipsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxFormComponent);
    component = fixture.componentInstance;

    // Assign the required inputs using setInput()
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('originalFrom', originalForm);
    fixture.componentRef.setInput('option', dummyOption);

    fixture.detectChanges();
  });

  it('should restore defaults for a given rule id', () => {
    // Get the control directly
    const ctrl = testForm.get('testRule')!;

    // Pre‑condition: change the control value and add a validator.
    ctrl.setValue('changed');
    ctrl.setValidators(() => ({ required: true }));
    ctrl.markAsDirty();

    // Call the method under test.
    component.onRestoreDefaults('testRule');

    // Get the original value from the corresponding control
    const originalCtrl = originalForm.get('testRule');

    // The control value should now match the original form's value.
    expect(ctrl.value).toBe(originalCtrl?.value);

    // Validators should be cleared.
    expect(ctrl.validator).toBeNull();

    // Control should be pristine.
    expect(ctrl.pristine).toBeTruthy();
  });
});
