import { describe, expect, it } from "vitest";
import {
  dashboardSummary,
  documents,
  events,
  notebookEntry,
  notebookStreak,
  roster,
  rsvps,
  spiritualHabits
} from "@/lib/mock-data";

describe("spiritualHabits", () => {
  it("has exactly 8 habits matching the Design.md spec", () => {
    expect(spiritualHabits).toHaveLength(8);
    const ids = spiritualHabits.map((h) => h.id);
    expect(ids).toEqual([
      "agpeya",
      "bible",
      "verse",
      "reflection",
      "mercy",
      "liturgy",
      "meeting",
      "service"
    ]);
  });

  it("marks weekly habits correctly", () => {
    const weeklyIds = spiritualHabits.filter((h) => h.weekly).map((h) => h.id);
    expect(weeklyIds).toEqual(["liturgy", "meeting", "service"]);
  });

  it("has valid labelKey for every habit", () => {
    for (const habit of spiritualHabits) {
      expect(typeof habit.labelKey).toBe("string");
      expect(habit.labelKey.length).toBeGreaterThan(0);
    }
  });
});

describe("events", () => {
  it("has at least 3 events", () => {
    expect(events.length).toBeGreaterThanOrEqual(3);
  });

  it("each event has required fields", () => {
    for (const event of events) {
      expect(event.id).toBeTruthy();
      expect(event.title["ar-EG"]).toBeTruthy();
      expect(event.title.en).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.coverImage).toMatch(/^\/assets\//);
      expect(event.tags.length).toBeGreaterThan(0);
      expect(event.requiredGear.length).toBeGreaterThan(0);
      expect(event.leaderPhone).toMatch(/^\+/);
    }
  });

  it("has at least one published and one draft event", () => {
    const statuses = events.map((e) => e.status);
    expect(statuses).toContain("published");
    expect(statuses).toContain("draft");
  });

  it("uses only valid EventTag values", () => {
    const validTags = ["coptic", "scout", "service", "camp", "sports", "training"];
    for (const event of events) {
      for (const tag of event.tags) {
        expect(validTags).toContain(tag);
      }
    }
  });
});

describe("roster", () => {
  it("has at least 3 scouts", () => {
    expect(roster.length).toBeGreaterThanOrEqual(3);
  });

  it("each scout has bilingual display name and valid avatar", () => {
    for (const scout of roster) {
      expect(scout.displayName["ar-EG"]).toBeTruthy();
      expect(scout.displayName.en).toBeTruthy();
      expect(scout.avatar).toMatch(/^\/assets\/avatar-/);
      expect(scout.attendance).toBeGreaterThanOrEqual(0);
      expect(scout.attendance).toBeLessThanOrEqual(100);
      expect(scout.level).toBeGreaterThanOrEqual(1);
    }
  });

  it("all scouts have role scout", () => {
    for (const scout of roster) {
      expect(scout.role).toBe("scout");
    }
  });
});

describe("documents", () => {
  it("has at least 3 documents", () => {
    expect(documents.length).toBeGreaterThanOrEqual(3);
  });

  it("covers all three document types", () => {
    const types = documents.map((d) => d.type);
    expect(types).toContain("medicalForm");
    expect(types).toContain("guardianConsent");
    expect(types).toContain("baptismCertificate");
  });

  it("each document references a valid scout", () => {
    const scoutIds = roster.map((s) => s.id);
    for (const doc of documents) {
      expect(scoutIds).toContain(doc.scoutId);
    }
  });

  it("has valid status values", () => {
    const validStatuses = ["pending", "approved", "rejected"];
    for (const doc of documents) {
      expect(validStatuses).toContain(doc.status);
    }
  });
});

describe("rsvps", () => {
  it("has at least 2 RSVPs", () => {
    expect(rsvps.length).toBeGreaterThanOrEqual(2);
  });

  it("each RSVP references valid event and scout IDs", () => {
    const eventIds = events.map((e) => e.id);
    const scoutIds = roster.map((s) => s.id);
    for (const rsvp of rsvps) {
      expect(eventIds).toContain(rsvp.eventId);
      expect(scoutIds).toContain(rsvp.scoutId);
    }
  });
});

describe("notebookEntry", () => {
  it("is private by default", () => {
    expect(notebookEntry.isPrivate).toBe(true);
  });

  it("has valid habit IDs", () => {
    const habitIds = spiritualHabits.map((h) => h.id);
    for (const id of notebookEntry.completedHabits) {
      expect(habitIds).toContain(id);
    }
  });

  it("has a date string", () => {
    expect(notebookEntry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("notebookStreak", () => {
  it("has current, target, and month data", () => {
    expect(notebookStreak.current).toBeGreaterThanOrEqual(0);
    expect(notebookStreak.target).toBeGreaterThan(0);
    expect(notebookStreak.month.length).toBeGreaterThanOrEqual(28);
  });

  it("month values are within 0-4 range", () => {
    for (const level of notebookStreak.month) {
      expect(level).toBeGreaterThanOrEqual(0);
      expect(level).toBeLessThanOrEqual(4);
    }
  });
});

describe("dashboardSummary", () => {
  it("has positive totals", () => {
    expect(dashboardSummary.totalYouth).toBeGreaterThan(0);
    expect(dashboardSummary.newThisMonth).toBeGreaterThanOrEqual(0);
    expect(dashboardSummary.upcomingRsvpPercent).toBeGreaterThanOrEqual(0);
    expect(dashboardSummary.upcomingRsvpPercent).toBeLessThanOrEqual(100);
  });

  it("has bilingual next event name", () => {
    expect(dashboardSummary.nextEventName["ar-EG"]).toBeTruthy();
    expect(dashboardSummary.nextEventName.en).toBeTruthy();
  });

  it("has recent activity entries", () => {
    expect(dashboardSummary.recentActivity.length).toBeGreaterThan(0);
    for (const activity of dashboardSummary.recentActivity) {
      expect(activity["ar-EG"]).toBeTruthy();
      expect(activity.en).toBeTruthy();
    }
  });

  it("notebook consistency is within 0-100", () => {
    expect(dashboardSummary.notebookConsistency).toBeGreaterThanOrEqual(0);
    expect(dashboardSummary.notebookConsistency).toBeLessThanOrEqual(100);
  });
});
