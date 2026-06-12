"use client";

import { Check, Clock, MapPin, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/i18n";
import type { EventTag, RsvpStatus, ScoutEvent } from "@/types";
import { useUpdateRsvpMutation } from "@/store/api/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/slices/uiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";

const tagTone: Record<EventTag, "cyan" | "gold" | "burgundy" | "olive" | "muted"> = {
  coptic: "gold",
  scout: "cyan",
  service: "burgundy",
  camp: "olive",
  sports: "muted",
  training: "cyan"
};

export function EventCard({ event, rsvpStatus }: { event: ScoutEvent; rsvpStatus?: RsvpStatus }) {
  const { text, locale, localize } = useTranslations();
  const dispatch = useAppDispatch();
  const [updateRsvp, { isLoading }] = useUpdateRsvpMutation();
  const tagLabel: Record<EventTag, string> = {
    coptic: text.copticTag,
    scout: text.scoutTag,
    service: text.serviceTag,
    camp: text.campTag,
    sports: text.sportsTag,
    training: text.trainingTag
  };

  async function setRsvp(status: RsvpStatus) {
    await updateRsvp({ eventId: event.id, scoutId: "scout-1", status });
    dispatch(
      showToast({
        tone: "success",
        message: status === "going" ? text.toastRsvpGoing : text.toastRsvpDeclined
      })
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={event.coverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover transition duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute top-4 flex flex-wrap gap-2 px-4">
          {event.priority ? (
            <Badge tone="burgundy">
              <span className="h-2 w-2 rounded-full bg-burgundy" />
              {text.highPriority}
            </Badge>
          ) : null}
          {event.tags.map((tag) => (
            <Badge key={tag} tone={tagTone[tag]}>
              {tagLabel[tag]}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black leading-tight">{localize(event.title)}</h2>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                {localize(event.timeRange)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {localize(event.location)}
              </span>
            </div>
          </div>
          <div className="min-w-16 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-center text-primary">
            <span className="block text-xs font-bold">{formatDate(event.date, locale, { month: "short" })}</span>
            <span className="block text-2xl font-black leading-none">
              {formatDate(event.date, locale, { day: "numeric" })}
            </span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{text.requiredGear}</p>
          <div className="flex flex-wrap gap-2">
            {event.requiredGear.map((gear) => (
              <span key={localize(gear)} className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-sm">
                {localize(gear)}
              </span>
            ))}
          </div>
        </div>
        <p className="border-s-2 border-primary/60 ps-4 text-sm leading-7 text-muted-foreground">
          {localize(event.description)}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant={rsvpStatus === "declined" ? "danger" : "outline"}
            disabled={isLoading}
            onClick={() => setRsvp("declined")}
          >
            <X className="h-4 w-4" />
            {text.cantMakeIt}
          </Button>
          <Button type="button" disabled={isLoading} onClick={() => setRsvp("going")}>
            <Check className="h-4 w-4" />
            {text.imGoing}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="sm:col-span-2"
            onClick={() => {
              window.location.href = `https://wa.me/${event.leaderPhone.replace(/\D/g, "")}`;
            }}
          >
            <MessageCircle className="h-4 w-4" />
            {text.contactLeader}
          </Button>
        </div>
      </div>
    </Card>
  );
}
