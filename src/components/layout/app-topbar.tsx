"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { useTranslations } from "./use-translations";

export function AppTopbar() {
  const { text } = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/scout/feed" className="font-display text-2xl font-black tracking-tight text-primary">
          {text.appName}
        </Link>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button type="button" variant="ghost" size="icon" aria-label={text.settings}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
