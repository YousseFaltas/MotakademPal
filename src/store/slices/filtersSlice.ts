import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocumentStatus, EventTag } from "@/types";

type FiltersState = {
  rosterSearch: string;
  eventTag: EventTag | "all";
  documentStatus: DocumentStatus | "all";
};

const initialState: FiltersState = {
  rosterSearch: "",
  eventTag: "all",
  documentStatus: "all"
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRosterSearch(state, action: PayloadAction<string>) {
      state.rosterSearch = action.payload;
    },
    setEventTag(state, action: PayloadAction<FiltersState["eventTag"]>) {
      state.eventTag = action.payload;
    },
    setDocumentStatus(state, action: PayloadAction<FiltersState["documentStatus"]>) {
      state.documentStatus = action.payload;
    }
  }
});

export const { setDocumentStatus, setEventTag, setRosterSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
