export const SYSTEM_LIST: { label: string, uri: string | null }[] = [
  {label: "CPT", uri: "http://www.ama-assn.org/go/cpt"},
  {label: "ICD 10", uri: "http://hl7.org/fhir/sid/icd-10"},
  {label: "ICD 10 CM  (U.S.)", uri: "http://hl7.org/fhir/sid/icd-10-cm"},
  {label: "ICD 10 PCS (U.S.)", uri: "http://hl7.org/fhir/sid/icd-10-pcs"},
  {label: "LOINC", uri: "http://loinc.org"},
  {label: "NDC", uri: "http://hl7.org/fhir/sid/ndc"},
  {label: "RxNorm", uri: "http://www.nlm.nih.gov/research/umls/rxnorm"},
  {label: "SNOMED CT", uri: "http://snomed.info/sct"},
  {label: "Other", uri: "other"},
];

export const  TIME_PERIOD_UNIT_LIST: { display: string, value: string }[] = [
  {display: 'Day(s)', value: 'days'},
  {display: 'Week(s)', value: 'weeks'},
  {display: 'Month(s)', value: 'months'},
  {display: 'Year(s)', value: 'years'},
];
