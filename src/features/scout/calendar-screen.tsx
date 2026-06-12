"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import { formatDate } from "@/i18n";
import { useGetEventsQuery } from "@/store/api/baseApi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";

export function CalendarScreen() {
  const { text, locale, localize } = useTranslations();
  const { data: events = [] } = useGetEventsQuery();
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div className="space-y-6">
      <header>
        <Badge tone="cyan" className="mb-3">
          <CalendarDays className="h-3.5 w-3.5" />
          {text.monthView}
        </Badge>
        <h1 className="text-3xl font-black text-primary">{text.calendar}</h1>
      </header>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-black">يونيو ٢٠٢٦</h2>
          <Badge tone="gold">{text.copticTag}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const hasEvent = events.some((event) => new Date(event.date).getUTCDate() === day);
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg border p-2 text-sm font-bold ${
                    hasEvent ? "border-primary bg-primary/15 text-primary" : "border-border bg-background/40"
                  }`}
                >
                  {new Intl.NumberFormat(locale).format(day)}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-black">{text.weekList}</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg border border-border bg-background/45 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{localize(event.title)}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {formatDate(event.date, locale, { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {localize(event.location)}
                    </span>
                  </div>
                </div>
                <Badge tone={event.status === "published" ? "cyan" : "muted"}>
                  {event.status === "published" ? text.published : text.draft}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
