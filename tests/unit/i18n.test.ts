import { describe, expect, it } from "vitest";
import { defaultLocale, dirByLocale, formatNumber, getDictionary, isRtl, locales } from "@/i18n";

describe("i18n", () => {
  it("defaults to Egyptian Arabic and RTL", () => {
    expect(defaultLocale).toBe("ar-EG");
    expect(dirByLocale["ar-EG"]).toBe("rtl");
    expect(isRtl("ar-EG")).toBe(true);
  });

  it("keeps dictionary keys aligned across locales", () => {
    const arabicKeys = Object.keys(getDictionary("ar-EG")).sort();
    const englishKeys = Object.keys(getDictionary("en")).sort();
    expect(locales).toEqual(["ar-EG", "en"]);
    expect(englishKeys).toEqual(arabicKeys);
  });

  it("formats Arabic numbers through the locale helper", () => {
    expect(formatNumber(42, "ar-EG")).toMatch(/[٤٢42]/);
  });
});
