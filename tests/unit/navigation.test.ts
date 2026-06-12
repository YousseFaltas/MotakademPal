import { describe, expect, it } from "vitest";
import { captainNavigation, scoutNavigation } from "@/config/navigation";
import { getDictionary } from "@/i18n";

const arDict = getDictionary("ar-EG");

describe("scoutNavigation", () => {
  it("has exactly 5 items", () => {
    expect(scoutNavigation).toHaveLength(5);
  });

  it("includes all expected scout routes", () => {
    const hrefs = scoutNavigation.map((item) => item.href);
    expect(hrefs).toContain("/scout/feed");
    expect(hrefs).toContain("/scout/calendar");
    expect(hrefs).toContain("/scout/notebook");
    expect(hrefs).toContain("/scout/profile");
  });

  it("every labelKey exists in the Arabic dictionary", () => {
    for (const item of scoutNavigation) {
      expect(arDict[item.labelKey]).toBeTruthy();
    }
  });

  it("every item has an icon component", () => {
    for (const item of scoutNavigation) {
      expect(item.icon).toBeTruthy();
    }
  });
});

describe("captainNavigation", () => {
  it("has exactly 4 items", () => {
    expect(captainNavigation).toHaveLength(4);
  });

  it("includes all expected captain routes", () => {
    const hrefs = captainNavigation.map((item) => item.href);
    expect(hrefs).toContain("/captain/dashboard");
    expect(hrefs).toContain("/captain/events");
    expect(hrefs).toContain("/captain/documents");
    expect(hrefs).toContain("/captain/roster");
  });

  it("every labelKey exists in the Arabic dictionary", () => {
    for (const item of captainNavigation) {
      expect(arDict[item.labelKey]).toBeTruthy();
    }
  });

  it("every item has an icon component", () => {
    for (const item of captainNavigation) {
      expect(item.icon).toBeTruthy();
    }
  });
});
