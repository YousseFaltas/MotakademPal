"use client";

import { BookOpen, Download, Plus, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/i18n";
import { useGetDashboardSummaryQuery, useGetRosterQuery } from "@/store/api/baseApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";

export function CaptainDashboardScreen() {
  const { text, locale, localize } = useTranslations();
  const { data: summary } = useGetDashboardSummaryQuery();
  const { data: roster = [] } = useGetRosterQuery();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-5xl font-black text-primary">{text.commandCenter}</h1>
          <p className="mt-2 text-muted-foreground">{text.welcomeCaptain}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            <Download className="h-4 w-4" />
            {text.exportReport}
          </Button>
          <Link
            href="/captain/events"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow-glow transition-all active:scale-95 electric-flow"
          >
            <Plus className="h-4 w-4" />
            {text.newEvent}
          </Link>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label={text.totalYouth}
          value={formatNumber(summary?.totalYouth ?? 0, locale)}
          detail={`+${formatNumber(summary?.newThisMonth ?? 0, locale)}`}
          icon={UsersRound}
        />
        <MetricCard
          label={text.upcomingRsvps}
          value={`${formatNumber(summary?.upcomingRsvpPercent ?? 0, locale)}%`}
          detail={summary ? localize(summary.nextEventName) : ""}
          icon={UsersRound}
        />
        <MetricCard
          label={text.spiritualConsistency}
          value={`${formatNumber(summary?.notebookConsistency ?? 0, locale)}/100`}
          detail={text.privacyNotice}
          icon={BookOpen}
          highlighted
        />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-black">{text.activeRoster}</h2>
          <Badge tone="cyan">{text.showingRoster}</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-start">
              <thead>
                <tr className="border-b border-border text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="py-3 text-start">{text.scoutName}</th>
                  <th className="py-3 text-start">{text.rankRole}</th>
                  <th className="py-3 text-start">{text.attendance}</th>
                  <th className="py-3 text-start">{text.progress}</th>
                  <th className="py-3 text-end">{text.actions}</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((scout) => (
                  <tr key={scout.id} className="border-b border-border/60">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={scout.avatar}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-full border border-primary/35"
                        />
                        <span className="font-bold">{localize(scout.displayName)}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge tone={scout.level > 3 ? "cyan" : "muted"}>{localize(scout.rank)}</Badge>
                    </td>
                    <td className="py-4 font-bold text-primary">{formatNumber(scout.attendance, locale)}%</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-36 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${scout.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Lvl {formatNumber(scout.level, locale)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-end">
                      <Button type="button" variant="ghost" size="sm">
                        {text.profile}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  highlighted = false
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  highlighted?: boolean;
}) {
  return (
    <Card className={highlighted ? "border-primary/60" : ""}>
      <CardHeader>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="font-display text-4xl font-black">{value}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
