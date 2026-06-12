"use client";

import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/uiSlice";
import { Button } from "@/components/ui/button";
import { useTranslations } from "./use-translations";

export function ThemeToggle() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const { text } = useTranslations();

  return (
    <Button type="button" variant="outline" size="icon" aria-label={text.theme} onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
