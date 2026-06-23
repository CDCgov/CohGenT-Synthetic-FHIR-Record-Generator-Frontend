interface ConceptFinderDialogData {
  fromPreset: boolean;
  systemList?: { label: string; uri: string | null }[];
  selectedSystem?: { label: string; uri: string | null };
  searchTermHint?: string;
  hasPresetsRendered?: boolean;
}
