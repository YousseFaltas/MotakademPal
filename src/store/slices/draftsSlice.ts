import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EventDraft, SpiritualHabitId } from "@/types";

type NotebookDraft = {
  completedHabits: SpiritualHabitId[];
  reflection: string;
};

type DraftsState = {
  eventDraft: EventDraft;
  notebookDraft: NotebookDraft;
};

const initialState: DraftsState = {
  eventDraft: {
    title: "",
    date: "",
    location: "",
    description: "",
    targetRank: "scout"
  },
  notebookDraft: {
    completedHabits: [],
    reflection: ""
  }
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    updateEventDraft(state, action: PayloadAction<Partial<EventDraft>>) {
      state.eventDraft = { ...state.eventDraft, ...action.payload };
    },
    resetEventDraft(state) {
      state.eventDraft = initialState.eventDraft;
    },
    setNotebookDraft(state, action: PayloadAction<NotebookDraft>) {
      state.notebookDraft = action.payload;
    },
    toggleNotebookHabit(state, action: PayloadAction<SpiritualHabitId>) {
      const exists = state.notebookDraft.completedHabits.includes(action.payload);
      state.notebookDraft.completedHabits = exists
        ? state.notebookDraft.completedHabits.filter((habit) => habit !== action.payload)
        : [...state.notebookDraft.completedHabits, action.payload];
    },
    setNotebookReflection(state, action: PayloadAction<string>) {
      state.notebookDraft.reflection = action.payload;
    }
  }
});

export const {
  resetEventDraft,
  setNotebookDraft,
  setNotebookReflection,
  toggleNotebookHabit,
  updateEventDraft
} = draftsSlice.actions;
export default draftsSlice.reducer;
