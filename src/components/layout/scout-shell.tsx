"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scoutNavigation } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { ToastHost } from "./toast-host";
import { AppTopbar } from "./app-topbar";
import { useTranslations } from "./use-translations";

export function ScoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { text } = useTranslations();

  return (
    <div className="min-h-screen pb-24">
      <AppTopbar />
      <main className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6">{children}</main>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/88 px-2 pt-2 shadow-[0_-12px_36px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          {scoutNavigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-14 flex-col items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition",
                  active
                    ? "bg-secondary/25 text-primary shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{text[item.labelKey]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <ToastHost />
    </div>
  );
}
