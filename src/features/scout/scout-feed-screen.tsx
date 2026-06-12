"use client";

import Link from "next/link";
import { Filter, ShieldCheck } from "lucide-react";
import { useGetEventsQuery, useGetRsvpsQuery } from "@/store/api/baseApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";
import { EventCard } from "@/features/events/event-card";

export function ScoutFeedScreen() {
  const { text } = useTranslations();
  const { data: events = [], isLoading } = useGetEventsQuery();
  const { data: rsvps = [] } = useGetRsvpsQuery();
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Badge tone="gold" className="mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            {text.appFullName}
          </Badge>
          <h1 className="text-3xl font-black tracking-tight text-primary">{text.upcomingMissions}</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">{text.parishName}</p>
        </div>
        <Button type="button" variant="ghost" size="icon" aria-label="filter">
          <Filter className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex rounded-xl border border-border bg-muted/45 p-1">
        <Link href="/scout/feed" className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-black text-primary-foreground">
          {text.scoutView}
        </Link>
        <Link href="/captain/dashboard" className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-bold text-muted-foreground hover:text-foreground">
          {text.captainView}
        </Link>
      </div>
      <div className="space-y-6">
        {isLoading
          ? [1, 2].map((item) => <FeedSkeleton key={item} />)
          : publishedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                rsvpStatus={rsvps.find((rsvp) => rsvp.eventId === event.id)?.status}
              />
            ))}
      </div>
    </div>
  );
}

function FeedSkeleton() {
  return (
    <Card className="space-y-4 p-5">
      <div className="h-48 animate-pulse rounded-xl bg-muted" />
      <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-11 animate-pulse rounded-lg bg-muted" />
        <div className="h-11 animate-pulse rounded-lg bg-muted" />
      </div>
    </Card>
  );
}
