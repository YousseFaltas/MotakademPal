"use client";

import { getDictionary, type Locale } from "@/i18n";
import { useAppSelector } from "@/store/hooks";

export function useTranslations() {
  const locale = useAppSelector((state) => state.locale.locale);
  const direction = useAppSelector((state) => state.locale.direction);
  const dictionary = getDictionary(locale);

  return {
    locale,
    direction,
    dictionary,
    text: dictionary,
    localize: <T extends Record<Locale, string>>(value: T) => value[locale]
  };
}
