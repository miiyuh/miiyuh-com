'use client'

// Autocomplete is now implemented using Combobox from Ark UI
// This file re-exports the Combobox components with Autocomplete naming for backwards compatibility

import {
  Combobox as Autocomplete,
  ComboboxControl as AutocompleteControl,
  ComboboxInput as AutocompleteInput,
  ComboboxTrigger as AutocompleteTrigger,
  ComboboxClearTrigger as AutocompleteClearTrigger,
  ComboboxContent as AutocompleteContent,
  ComboboxItem as AutocompleteItem,
  ComboboxItemGroup as AutocompleteGroup,
  ComboboxItemGroupLabel as AutocompleteGroupLabel,
  ComboboxLabel as AutocompleteLabel,
  ComboboxList as AutocompleteList,
  useListCollection,
} from '@/components/ui/combobox'

// Re-export Combobox as Autocomplete with aliased names
const AutocompletePopup = AutocompleteContent
const AutocompleteClear = AutocompleteClearTrigger

export {
  Autocomplete,
  AutocompleteControl,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompletePopup,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteClear,
  AutocompleteClearTrigger,
  useListCollection,
}
