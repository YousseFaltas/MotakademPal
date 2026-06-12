import { describe, expect, it } from "vitest";
import { baseApi } from "@/store/api/baseApi";
import { makeStore } from "@/store/store";
import { setLocale } from "@/store/slices/localeSlice";
import { toggleNotebookHabit } from "@/store/slices/draftsSlice";
import { setRosterSearch } from "@/store/slices/filtersSlice";

describe("redux store", () => {
  it("updates locale direction", () => {
    const store = makeStore();
    store.dispatch(setLocale("en"));
    expect(store.getState().locale.direction).toBe("ltr");
    store.dispatch(setLocale("ar-EG"));
    expect(store.getState().locale.direction).toBe("rtl");
  });

  it("tracks notebook draft habits", () => {
    const store = makeStore();
    store.dispatch(toggleNotebookHabit("agpeya"));
    expect(store.getState().drafts.notebookDraft.completedHabits).toContain("agpeya");
    store.dispatch(toggleNotebookHabit("agpeya"));
    expect(store.getState().drafts.notebookDraft.completedHabits).not.toContain("agpeya");
  });

  it("stores roster filters", () => {
    const store = makeStore();
    store.dispatch(setRosterSearch("كيرلس"));
    expect(store.getState().filters.rosterSearch).toBe("كيرلس");
  });

  it("exposes planned RTK Query endpoints", () => {
    expect(Object.keys(baseApi.endpoints)).toEqual(
      expect.arrayContaining([
        "getEvents",
        "getEvent",
        "createEvent",
        "updateEvent",
        "publishEvent",
        "getRsvps",
        "updateRsvp",
        "getNotebookEntry",
        "saveNotebookEntry",
        "getNotebookStreak",
        "getRoster",
        "getScoutDetails",
        "getDocuments",
        "uploadDocument",
        "reviewDocument",
        "getDashboardSummary"
      ])
    );
  });
});
