import { describe, expect, it } from "vitest";
import { makeStore } from "@/store/store";
import { setRole, setCurrentProfile } from "@/store/slices/authSlice";
import { toggleTheme, setTheme, showToast, clearToast, setProfileDrawerOpen, setSettingsOpen } from "@/store/slices/uiSlice";
import { updateEventDraft, resetEventDraft, setNotebookDraft, setNotebookReflection, toggleNotebookHabit } from "@/store/slices/draftsSlice";
import { setEventTag, setDocumentStatus, setRosterSearch } from "@/store/slices/filtersSlice";
import { setLocale } from "@/store/slices/localeSlice";

describe("authSlice", () => {
  it("sets role to captain", () => {
    const store = makeStore();
    expect(store.getState().auth.role).toBe("scout");
    store.dispatch(setRole("captain"));
    expect(store.getState().auth.role).toBe("captain");
  });

  it("sets current profile and marks authenticated", () => {
    const store = makeStore();
    expect(store.getState().auth.currentProfile).toBeNull();
    const profile = {
      id: "scout-1",
      displayName: { "ar-EG": "كيرلس", en: "Kyrillos" },
      initials: "KS",
      role: "scout" as const,
      rank: { "ar-EG": "كشاف", en: "Scout" },
      patrol: { "ar-EG": "مار مرقس", en: "St. Mark" },
      attendance: 90,
      progress: 80,
      level: 3,
      emergencyContact: "+201001234567",
      avatar: "/assets/avatar-kyrillos.svg"
    };
    store.dispatch(setCurrentProfile(profile));
    expect(store.getState().auth.status).toBe("authenticated");
    expect(store.getState().auth.currentProfile?.id).toBe("scout-1");
  });

  it("clears profile and marks anonymous", () => {
    const store = makeStore();
    store.dispatch(setCurrentProfile(null));
    expect(store.getState().auth.status).toBe("anonymous");
    expect(store.getState().auth.currentProfile).toBeNull();
  });
});

describe("uiSlice", () => {
  it("toggles theme between dark and light", () => {
    const store = makeStore();
    expect(store.getState().ui.theme).toBe("dark");
    store.dispatch(toggleTheme());
    expect(store.getState().ui.theme).toBe("light");
    store.dispatch(toggleTheme());
    expect(store.getState().ui.theme).toBe("dark");
  });

  it("sets theme directly", () => {
    const store = makeStore();
    store.dispatch(setTheme("light"));
    expect(store.getState().ui.theme).toBe("light");
  });

  it("shows and clears toast", () => {
    const store = makeStore();
    expect(store.getState().ui.toast).toBeNull();
    store.dispatch(showToast({ message: "تمام", tone: "success" }));
    expect(store.getState().ui.toast?.message).toBe("تمام");
    expect(store.getState().ui.toast?.tone).toBe("success");
    expect(store.getState().ui.toast?.id).toBeTruthy();
    store.dispatch(clearToast());
    expect(store.getState().ui.toast).toBeNull();
  });

  it("controls profile drawer state", () => {
    const store = makeStore();
    expect(store.getState().ui.profileDrawerOpen).toBe(false);
    store.dispatch(setProfileDrawerOpen(true));
    expect(store.getState().ui.profileDrawerOpen).toBe(true);
    store.dispatch(setProfileDrawerOpen(false));
    expect(store.getState().ui.profileDrawerOpen).toBe(false);
  });

  it("controls settings panel state", () => {
    const store = makeStore();
    expect(store.getState().ui.settingsOpen).toBe(false);
    store.dispatch(setSettingsOpen(true));
    expect(store.getState().ui.settingsOpen).toBe(true);
  });
});

describe("draftsSlice", () => {
  it("updates event draft fields", () => {
    const store = makeStore();
    store.dispatch(updateEventDraft({ title: "تدريب جديد", location: "الكنيسة" }));
    expect(store.getState().drafts.eventDraft.title).toBe("تدريب جديد");
    expect(store.getState().drafts.eventDraft.location).toBe("الكنيسة");
    expect(store.getState().drafts.eventDraft.targetRank).toBe("scout");
  });

  it("resets event draft to initial state", () => {
    const store = makeStore();
    store.dispatch(updateEventDraft({ title: "test", date: "2026-06-15" }));
    store.dispatch(resetEventDraft());
    expect(store.getState().drafts.eventDraft.title).toBe("");
    expect(store.getState().drafts.eventDraft.date).toBe("");
  });

  it("sets notebook draft with habits and reflection", () => {
    const store = makeStore();
    store.dispatch(setNotebookDraft({
      completedHabits: ["agpeya", "bible"],
      reflection: "تأمل النهارده"
    }));
    expect(store.getState().drafts.notebookDraft.completedHabits).toEqual(["agpeya", "bible"]);
    expect(store.getState().drafts.notebookDraft.reflection).toBe("تأمل النهارده");
  });

  it("sets notebook reflection independently", () => {
    const store = makeStore();
    store.dispatch(setNotebookReflection("كان يوم حلو"));
    expect(store.getState().drafts.notebookDraft.reflection).toBe("كان يوم حلو");
  });

  it("toggles notebook habits on and off", () => {
    const store = makeStore();
    store.dispatch(toggleNotebookHabit("liturgy"));
    expect(store.getState().drafts.notebookDraft.completedHabits).toContain("liturgy");
    store.dispatch(toggleNotebookHabit("meeting"));
    expect(store.getState().drafts.notebookDraft.completedHabits).toEqual(["liturgy", "meeting"]);
    store.dispatch(toggleNotebookHabit("liturgy"));
    expect(store.getState().drafts.notebookDraft.completedHabits).toEqual(["meeting"]);
  });
});

describe("filtersSlice", () => {
  it("sets event tag filter", () => {
    const store = makeStore();
    expect(store.getState().filters.eventTag).toBe("all");
    store.dispatch(setEventTag("coptic"));
    expect(store.getState().filters.eventTag).toBe("coptic");
    store.dispatch(setEventTag("all"));
    expect(store.getState().filters.eventTag).toBe("all");
  });

  it("sets document status filter", () => {
    const store = makeStore();
    expect(store.getState().filters.documentStatus).toBe("all");
    store.dispatch(setDocumentStatus("pending"));
    expect(store.getState().filters.documentStatus).toBe("pending");
    store.dispatch(setDocumentStatus("approved"));
    expect(store.getState().filters.documentStatus).toBe("approved");
  });

  it("sets roster search", () => {
    const store = makeStore();
    store.dispatch(setRosterSearch("بيشوي"));
    expect(store.getState().filters.rosterSearch).toBe("بيشوي");
  });
});

describe("localeSlice", () => {
  it("normalizes invalid locale to default", () => {
    const store = makeStore();
    store.dispatch(setLocale("fr"));
    expect(store.getState().locale.locale).toBe("ar-EG");
    expect(store.getState().locale.direction).toBe("rtl");
  });

  it("switches between ar-EG and en", () => {
    const store = makeStore();
    store.dispatch(setLocale("en"));
    expect(store.getState().locale.locale).toBe("en");
    expect(store.getState().locale.direction).toBe("ltr");
    store.dispatch(setLocale("ar-EG"));
    expect(store.getState().locale.locale).toBe("ar-EG");
    expect(store.getState().locale.direction).toBe("rtl");
  });
});
