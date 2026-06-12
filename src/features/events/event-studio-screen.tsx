"use client";

import { Copy, ImagePlus, Link as LinkIcon, List, Send } from "lucide-react";
import {
  useCreateEventMutation,
  useGetEventsQuery,
  usePublishEventMutation
} from "@/store/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetEventDraft, updateEventDraft } from "@/store/slices/draftsSlice";
import { showToast } from "@/store/slices/uiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/components/layout/use-translations";

export function EventStudioScreen() {
  const { text, localize } = useTranslations();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.drafts.eventDraft);
  const { data: events = [] } = useGetEventsQuery();
  const [createEvent, { isLoading: creating }] = useCreateEventMutation();
  const [publishEvent, { isLoading: publishing }] = usePublishEventMutation();

  function duplicatePrevious() {
    const previous = events[0];
    if (!previous) return;
    dispatch(
      updateEventDraft({
        title: localize(previous.title),
        date: previous.date.slice(0, 10),
        location: localize(previous.location),
        description: localize(previous.description),
        targetRank: "scout"
      })
    );
  }

  async function save(status: "draft" | "published") {
    const created = await createEvent(draft).unwrap();
    if (status === "published") {
      await publishEvent(created.id).unwrap();
    }
    dispatch(resetEventDraft());
    dispatch(showToast({ tone: "success", message: status === "published" ? text.publishEvent : text.saveDraft }));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-primary">{text.eventStudio}</h1>
          <p className="mt-2 text-muted-foreground">{text.descriptionPlaceholder}</p>
        </div>
        <Button type="button" variant="outline" onClick={duplicatePrevious}>
          <Copy className="h-4 w-4" />
          {text.duplicatePrevious}
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <button
            type="button"
            className="flex aspect-[16/6] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            <ImagePlus className="mb-3 h-10 w-10" />
            <span className="text-lg font-black">{text.dragCover}</span>
            <span className="mt-1 text-sm">{text.browseCover}</span>
          </button>

          <Card>
            <CardContent className="space-y-4 pt-5">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-primary">
                  {text.eventTitle}
                </span>
                <Input
                  value={draft.title}
                  placeholder={text.eventTitlePlaceholder}
                  onChange={(event) => dispatch(updateEventDraft({ title: event.target.value }))}
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-primary">
                    {text.dateTime}
                  </span>
                  <Input
                    type="date"
                    value={draft.date}
                    onChange={(event) => dispatch(updateEventDraft({ date: event.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-primary">
                    {text.location}
                  </span>
                  <Input
                    value={draft.location}
                    placeholder={text.locationPlaceholder}
                    onChange={(event) => dispatch(updateEventDraft({ location: event.target.value }))}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 p-2">
              <Button type="button" variant="ghost" size="icon" aria-label="bold">
                <strong>B</strong>
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label="italic">
                <em>I</em>
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label="list">
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label="link">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              className="min-h-56 rounded-none border-0 bg-background/25 focus:ring-0"
              value={draft.description}
              placeholder={text.descriptionPlaceholder}
              onChange={(event) => dispatch(updateEventDraft({ description: event.target.value }))}
            />
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <h2 className="text-2xl font-black">{text.published}</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-primary">{text.targetRank}</p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="cyan">{text.scoutTag}</Badge>
                <Badge tone="muted">{text.trainingTag}</Badge>
                <Badge tone="gold">{text.copticTag}</Badge>
              </div>
            </div>
            <Button type="button" className="w-full" disabled={creating || publishing} onClick={() => save("published")}>
              <Send className="h-4 w-4" />
              {text.publishEvent}
            </Button>
            <Button type="button" variant="outline" className="w-full" disabled={creating} onClick={() => save("draft")}>
              {text.saveDraft}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
