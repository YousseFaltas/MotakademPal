"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { captainNavigation } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "./app-topbar";
import { ToastHost } from "./toast-host";
import { useTranslations } from "./use-translations";

export function CaptainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { text, direction } = useTranslations();

  return (
    <div className="min-h-screen">
      <aside
        className={cn(
          "fixed top-0 z-50 hidden h-screen w-72 flex-col border-border/70 bg-card/82 p-5 shadow-soft backdrop-blur-xl md:flex",
          direction === "rtl" ? "right-0 border-l" : "left-0 border-r"
        )}
      >
        <div className="mb-8 flex items-center gap-3">
          <Image
            src="/assets/avatar-kyrillos.svg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-primary/50"
          />
          <div>
            <p className="text-lg font-black text-primary">القائد مينا</p>
            <p className="text-xs font-semibold text-muted-foreground">{text.captainView}</p>
            <p className="text-xs text-primary">{text.parishName}</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {captainNavigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition",
                  active ? "electric-flow text-white shadow-glow" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                >
                <Icon className="h-5 w-5" />
                {text[item.labelKey]}
              </Link>
            );
          })}
        </nav>
        <Button type="button" variant="ghost" className="justify-start">
          <Settings className="h-5 w-5" />
          {text.settings}
        </Button>
        <p className="mt-6 font-display text-3xl font-black text-primary/70">{text.appName}</p>
      </aside>
      <div className={cn(direction === "rtl" ? "md:mr-72" : "md:ml-72")}>
        <AppTopbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">{children}</main>
      </div>
      <ToastHost />
    </div>
  );
}
