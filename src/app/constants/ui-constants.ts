export const UI_CONSTANTS = {
  COHORT_GENERATION: {
    LANDING_PAGE: {
      DESCRIPTION: 'CohGenT (Cohort Generation Tool) is a synthetic testing data generator that creates patient records for public health use. Records are conformant to the FHIR (Fast Healthcare Interoperability Resources) standard and United States Core Data for Interoperability (USCDI).',
      BULLETS: [
        'Select a public health scenario to define your cohort.',
        'Configure patient demographics (e.g., age at diagnosis, race, ethnicity).',
        'Add scenario-specific data, such as medications, laboratory tests, and other clinical elements',
        'Generate FHIR records in your preferred output format:',
      ],
      SUPPORTED_FORMATS: ['JSON', 'NDJSON'],
      PHI_LANGUAGE: 'This tool is intended solely for generating synthetic, fictitious patient data for testing purposes. Do not enter, upload, or attempt to replicate any actual patient information, protected health information (PHI), or personally identifiable information (PII). Any resemblance to real patients or individuals is purely coincidental. Users are solely responsible for ensuring compliance with applicable privacy laws and regulations, including HIPAA and other data protection requirements.',
    },
    CONCEPT_LABELS: {
      DISPLAY: "The official human readable string associated with the code given. If no code is provided, this string will only be populated to the CodeableConcept text field.",
      CODE: "The code as it appears for the concept in a given code system/terminology standard.",
      SYSTEM: "The medical terminology system from which the code is taken.",
      SYSTEM_URI: "The system's defining URI/URL in FHIR."
    },
    SELECT_USE_CASE: {
      COHORT_SCENARIO: "Cohort Scenario",
      COHORT_SCENARIO_DESCRIPTION: "Select the base scenario for your cohort's data. Scenarios represent major use cases such as case surveillance and mortality reporting.",
      PRIMARY_EVENT_PERIOD: "Primary Clinical Data Period",
      PRIMARY_EVENT_PERIOD_TOOLTIP: "Dates are randomly assigned based on the time period defined in this step for each patient in the cohort.",
      PRIMARY_EVENT_PERIOD_DESCRIPTION: " Set the primary clinical data period for the given scenario. (Example: The onset date of the condition of interest.)",
      EXTEND_DATA_UNTIL: "Extend Data Until",
      EXTEND_DATA_UNTIL_TOOLTIP: "Enter a date here if you want to extend synthetic data collection beyond the primary clinical data period.",
      EXTEND_DATA_UNTIL_DESCRIPTION: "Optionally set a date for data to continue beyond the primary clinical data period. (Example: Continued labs or procedures.)",
      CONTINUED_MONITORING_UNTIL: "Continued monitoring until",
      USE_CASE_DESCRIPTION: "Cohort Scenario Description",
      COHORT_NAME: "Cohort Name",
      COHORT_TIMING: "Cohort Timing",
      BTN_LABELS: {
        CONFIGURE_NEW_COHORT: 'Begin Configuring Cohort',
      },
    },
    CONDITION: {
      CONCEPT_HINTS: {
        DISPLAY: "e.g. Tuberculosis",
        CODE: "e.g. 56717001",
        SYSTEM: "e.g. SNOMED CT 10",
        SYSTEM_URI: "e.g., http://example.com/system",
      },
      SEARCH_TERM_HINT: 'ex: "56717001" (by Code) or "Tuberculosis" (by Name)',
    },
    MEDICATIONS: {
      STEP_TITLE: "Medications",
      STEP_DESCRIPTION: "Add a Medication Set to specify medications. Add more than one set and assign weighted values to specify which proportion of the cohort receives which medications.",
      CONCEPT_HINTS: {
        DISPLAY: "e.g. amoxicillin",
        CODE: "e.g. 308191",
        SYSTEM: "e.g. RxNorm",
        SYSTEM_URI: "e.g., http://example.com/system",
      },
      SEARCH_TERM_HINT: 'ex: "308191" (by Code) or "amoxicillin" (by Name)',
      DOSAGE_INSTRUCTIONS: "Enter the dosage instructions associated with the medication.",
      MEDICATION_SET: "Medication Set",
      FINISH_EDITING_ERROR_MSG: "You must finish editing the current medication set before saving.",
    },
    ADDITIONAL_DATA: {
      STEP_TITLE: "Clinical Data",
      STEP_DESCRIPTION: "Add a Clinical Data Set to group lab results, procedures, and radiology reports with the same timing. Create separate sets for data with different timing.",
      TIMING_TOOLTIP: "Setting Clinical Data Set timing allows control of when the clinical data set occurs relative to a Patient's primary event, such as a Condition's onset, as well as if and how often the clinical data set will repeat.",
      DATA_SET_DESCRIPTION: "Assign Clinical Data Set Settings to establish the timing of the data relative to the primary condition onset, then add one or multiple types of clinical data for that time period.",
      LAB_RESULTS_VALUES_DESCRIPTIONS: {
        STRING: "Enter possible string values below. To allow for more than one possible value, click \"Add Value\". If more than one possible value is provided, enter a percentage weight (chance of occurrence) for each value.",
        QUANTITY: {
          PART_1: "Enter the range for the numerical value. A value will be selected randomly within the range provided for each instance of the lab result. Enter units per the Unified Code for Units of Measure",
          PART_2: "Common lab tests may have associated presets which can be selected above."
        },
        SELECT_VALUE_TYPE_DESCRIPTION: "Select a value type. Some have preset values.",
      },
      FINISH_EDITING_ERROR_MSG: "You must finish editing the current clinical data set before saving.",
      CONCEPT_HINTS: {
        PROCEDURE: {
          DISPLAY: "e.g. Tangential biopsy of skin (eg, shave, scoop, saucerize, curette); single lesion",
          CODE: "e.g. 11102",
          SYSTEM: "e.g. CPT4",
          SYSTEM_URI: "e.g., http://example.com/system",
        },
        RADIOLOGY_REPORT: {
          DISPLAY: "e.g. Tangential biopsy of skin (eg, shave, scoop, saucerize, curette); single lesion",
          CODE: "e.g. 11102",
          SYSTEM: "e.g. CPT4",
          SYSTEM_URI: "e.g., http://example.com/system",
        },
        OBSERVATION: {
          DISPLAY: "e.g., Sodium in Serum",
          CODE: "e.g. 2951-2",
          SYSTEM: "e.g. LOINC",
          SYSTEM_URI: "e.g., http://example.com/system",
        },
        DIAGNOSTIC_PANEL: {
          DISPLAY: "e.g. Comprehensive metabolic 2000 panel",
          CODE: "e.g. 24323-8",
          SYSTEM: "e.g. LOINC",
          SYSTEM_URI: "e.g., http://example.com/system",
        }
      },
      CLINICAL_DATA_TOOLTIPS: {
        LAB_RESULT: "Add a Lab Result using the U.S. Core 6.1.0 Laboratory Result Observation Profile",
        PROCEDURE: 'Add a Procedure using the U.S. Core 6.1.0 Procedure Profile',
        RADIOLOGY_REPORT: "Add a Radiology Report using the U.S. Core 6.1.0 DiagnosticReport for Report and Note Exchange Profile with a category of radiology"
      },
      SEARCH_TERM_HINTS: {
        DIAGNOSTIC_PANEL_CONCEPT: 'ex: "24323-8" (by Code) or "Comprehensive metabolic 2000 panel" (by Name)',
        LAB_RESULT_CONCEPT: 'ex: "2823-3" (by Code) or "Potassium in Serum" (by Name)',
        PROCEDURE_CONCEPT: 'ex: "11102" (by Code) or "Tangential biopsy of skin" (by Name)',
        RADIOLOGY_CONCEPT: 'ex: "11102" (by Code) or "Tangential biopsy of skin" (by Name)'
      },
      EVENT_SET_SETTINGS: {
        DIAGNOSTIC_REPORT_SETTINGS: {
          CHECKBOX_LBL: "Create Clinical Data Set as a Lab Panel?",
          INSTRUCTIONS: "Select this to create this clinical data set as a lab panel. All members of the clinical data set should be members of the specified panel. If selected, provide a concept for the panel.",
          TOOLTIP: "Lab panels are collected in a FHIR Diagnostic Report. A Diagnostic Report is a formal group of observations or procedures.",
        }
      },
      CLINICAL_DATA_SET: "Clinical Data Set",
    },
    REVIEW_COHORT: {
      STEP_TITLE: "Review Cohort",
      DESCRIPTION: "Review and confirm your cohort settings. Navigate to previous pages to make edits to your cohort data.",
    },
    CONFIRM_AND_GENERATE: {
      STEP_TITLE: "Finalize and Generate",
      DESCRIPTION: "Set cohort count and optionally edit advanced cohort settings.",
      NUMBER_OF_PATIENTS: "Number of Patients",
      NUMBER_OF_PATIENTS_DESCRIPTION: "Set the number of patients in the cohort.",
      MIN_MAX_PATIENTS: {
        MIN: 1,
        MAX: 50,
      },
      SELECT_BETWEEN: "Enter or select a number between 1 and 50",
      NUMBER_MUST_BR_BETWEEN: "The number of patients must be between 1 and 50",
      RANDOM_SEED: 'Random Seed',
      RANDOM_SEED_DESCRIPTION: 'Seeds control randomization. Leave the seed the same to generate the same set of patient data. Change the seed or click "Regenerate Seed" to create a different set of patient data.',
      RANDOM_SEED_TOOLTIP: 'A random seed is an arbitrary value used to create reproducible results with randomized data. Using the same settings with the same seed will produce the same results.',
      BTN_LABELS: {
        GENERATE_COHORT: 'Generate FHIR Records',
        GENERATE_NEW_RANDOM_SEED: 'Regenerate Seed',
      },
      SELECT_BUNDLE_TYPE: "Bundle Type",
      SELECT_OUTPUT_FORMAT: "Output Format",
      SELECT_OUTPUT_FORMAT_INSTRUCTIONS: "Select the type of FHIR output to generate from the options.",
      SELECT_OUTPUT_FORMAT_TOOLTIP: "Selecting FHIR JSON Bundle will generate a set of FHIR transaction Bundles by patient in the JSON format, compressed into a zip file. Selecting Bulk Data NDJSON will generate a set of New-line Delimited JSON files in the BULK FHIR format, divided by resource type, compressed into a zip file.",
    }
  },

  ERROR_MSG: {
    REQUIRED: "Value is Required",
    UNTIL_DATE_MUST_BE_AFTER_THE_END_DATE: "Until Date must be after the End Date",
    START_DATE_MUST_BE_AFTER_END_DATE: "Start Date must be after the End Date",
    END_DATE_MUST_BE_BEFORE_START_DATE: "End Date must be before Start Date",
    LESS_THAN_OR_EQUAL_TO: "Must be less than or equal to",
    GREATER_THAN_OR_EQUAL_TO: "Must be greater than or equal to",
    GREATER_THAN: "Must be greater than",
    POSITIVE_REQUIRED: "Value must be positive"
  }

}
