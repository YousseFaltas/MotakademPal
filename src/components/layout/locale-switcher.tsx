"use client";

import { Languages } from "lucide-react";
import { localeLabels, locales } from "@/i18n";
import { useAppDispatch } from "@/store/hooks";
import { setLocale } from "@/store/slices/localeSlice";
import { Button } from "@/components/ui/button";
import { useTranslations } from "./use-translations";

export function LocaleSwitcher() {
  const dispatch = useAppDispatch();
  const { locale, text } = useTranslations();
  const nextLocale = locale === "ar-EG" ? "en" : "ar-EG";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={text.switchLanguage}
      onClick={() => dispatch(setLocale(nextLocale))}
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">
        {localeLabels[nextLocale as (typeof locales)[number]]}
      </span>
    </Button>
  );
}
