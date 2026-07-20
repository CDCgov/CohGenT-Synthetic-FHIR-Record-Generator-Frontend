/**
 * Component for managing concept selection with tabbed interface for preset and custom concepts.
 * Supports flexible validation allowing display-only, code-only, or full concept specifications.
 */
import {AfterViewInit, Component, inject, input, ViewChild} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Option} from '../../../../models/use-case';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatOption, MatSelect} from '@angular/material/select';
import {SYSTEM_LIST} from '../../../../../../constants/app-constants';
import {UI_CONSTANTS} from '../../../../../../constants/ui-constants';
import {ChipsPipe} from '../../../../pipes/chips-pipe';
import { MatButtonModule} from '@angular/material/button';
import {openConceptFinderModal} from '../../concept-finder-modal/concept-finder-modal';
import {MatDialog} from '@angular/material/dialog';
import {Concept} from '../../../../models/cohort-generation-request-body';
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {ConceptSimpleDisplayComponent} from './concept-simple-display/concept-simple-display.component';
import {MatDivider} from '@angular/material/list';
import {SharedHttpErrorService} from '../../../../../../shared/services/shared-http-error.service';


@Component({
  selector: 'app-concept-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    MatSelect,
    MatOption,
    ChipsPipe,
    MatButtonModule,
    MatTabsModule,
    ConceptSimpleDisplayComponent,
    NgClass,
    MatDivider
  ],
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.scss','../../cohort-generation.component.scss']
})
export class ConceptFormComponent implements AfterViewInit {

  /**
   * Validation Cases:
   * User wants strict data and knows the official display, code, system/system urn. All fields filled out.
   * User doesn't know or care about a code or system and just wants to name a medication in plain english. Only display filled out.
   * User doesn't want to deal with matching the display string but has a specific, official code they want. Only fills out code and system/system urn.
   * User doesn't have a display, but has a specific code they want that is custom. Let's pretend they are testing an implementation guide with system urn that can't be validated. (This is actually common). They should ideally know the system and select one of our preset ones, but if they dont (or its a made up code for their purposes) and select custom then they may not even have a system urn at all. Only code filled out.
   *
   *
   * A combination of #2 and #4 could also happen I guess? they want to have like: display: "Super Virus 2026", code: "12345" that they made up, so no system/system urn. they could also of course make up a system urn but lets pretend they have no idea what that matters and just dont.
   * breaking this down i think its actually kind of simple validation...
   * One of at least code or display must be present.
   * If code is not present, system urn is ignored (we cant have a system without a code, it would be weird). this could actually not even be validation just how you package the data. if code == "", system == "" when you send to api. the api will be literal about this though and always process strings like:
   * system^code^display because thats how michael built fhir sheets. its not judgmental on what parts of a concept it is given
   */

  /** The form group containing concept-related controls */
  form = input.required<FormGroup>();

  /** Configuration option defining the concept field behavior */
  option = input.required<Option>();

  /** Hint texts for different concept form fields (display, code, system, system URI) */
  formFieldHints = input<{ DISPLAY: string; CODE: string; SYSTEM: string; SYSTEM_URI: string }>();

  /** Hint text for the search term field */
  searchTermHint = input<string>('');

  /** Whether preset concepts have can be rendered in the UI */
  hasPresetsRendered = input<boolean>(false);

  /** List of available coding systems */
  readonly SYSTEM_LIST = SYSTEM_LIST

  /** UI labels for concept form fields */
  readonly LABELS = UI_CONSTANTS.COHORT_GENERATION.CONCEPT_LABELS;

  /** Default system URI for the concept */
  defaultSystemUri: string = '';

  /** Default system display name for the concept */
  defaultSystemDisplay: string = '';

  /** ID of the currently selected tab */
  selectedTabId: string = '';

  /** Reference to the Material tab group component */
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  /** Initializes default system values and selected tab after view initialization */
  ngAfterViewInit(): void {
   this.defaultSystemUri =  this.form().get([`${this.option().ruleId}`, 'systemUri']).value;
   this.defaultSystemDisplay =  this.form().get([`${this.option().ruleId}`, 'system']).value;

   // Get the initial selected tab information
   if (this.tabGroup) {
     this.selectedTabId = this.tabGroup._allTabs.first.id;
   }
  }

  /** Material dialog service for opening modals */
  private dialog: MatDialog = inject(MatDialog);

  /** Service for managing HTTP error display */
  private sharedHttpErrorService = inject(SharedHttpErrorService);

  /** Opens the concept finder modal to search for concepts from preset or custom systems */
  onSearchConcept(fromPreset: boolean){
    let data = null;
    if(fromPreset){
      data = {fromPreset: fromPreset};
    }
    else {
      const selectedSystemUri = this.form().get([`${this.option().ruleId}`, 'systemUri']).value;
      const selectedSystem = SYSTEM_LIST.find(system => system.uri === selectedSystemUri);
      data = {
        fromPreset: fromPreset,
        selectedSystem: selectedSystem,
        systemList: SYSTEM_LIST,
        searchTermHint: this.searchTermHint(),
        hasPresetsRendered: this.hasPresetsRendered()};
    }

    const selectedSystem = SYSTEM_LIST.find(system => system.uri === this.defaultSystemUri)

    data.selectedSystem = selectedSystem;

    openConceptFinderModal(this.dialog, this.sharedHttpErrorService, data).subscribe({
      next: (concept: Concept) => {
        if(concept){
          const conceptForm = this.form().get([`${this.option().ruleId}`]) as FormGroup;
          conceptForm.patchValue({
            display: concept.display,
            code: concept.code,
            system: concept.systemUri,
            systemUri: concept.systemUri
          });
        }
      }
    });
  }

  /** Handles tab change events and updates the selected tab ID */
  protected onTabChange(event: MatTabChangeEvent) {
    this.selectedTabId = event.tab.id;
  }
}
