import { arEG, type MessageKey } from "./messages/ar-EG";
import { en } from "./messages/en";

export const defaultLocale = "ar-EG" as const;
export const locales = ["ar-EG", "en"] as const;

export type Locale = (typeof locales)[number];
export type Dictionary = Record<MessageKey, string>;

export const localeLabels: Record<Locale, string> = {
  "ar-EG": "عربي مصري",
  en: "English"
};

export const dirByLocale: Record<Locale, "rtl" | "ltr"> = {
  "ar-EG": "rtl",
  en: "ltr"
};

export const dictionaries: Record<Locale, Dictionary> = {
  "ar-EG": arEG,
  en
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function isRtl(locale: Locale): boolean {
  return dirByLocale[locale] === "rtl";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function formatDate(
  value: string | number | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function t(locale: Locale, key: MessageKey): string {
  return getDictionary(locale)[key];
}
