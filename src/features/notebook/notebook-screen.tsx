"use client";

import { useEffect } from "react";
import { BookOpen, Cross, Flame, HeartHandshake, LockKeyhole, Save, ScrollText } from "lucide-react";
import { spiritualHabits } from "@/lib/mock-data";
import {
  useGetNotebookEntryQuery,
  useGetNotebookStreakQuery,
  useSaveNotebookEntryMutation
} from "@/store/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setNotebookDraft,
  setNotebookReflection,
  toggleNotebookHabit
} from "@/store/slices/draftsSlice";
import { showToast } from "@/store/slices/uiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/components/layout/use-translations";

const todayKey = new Date().toISOString().slice(0, 10);

const habitIcons = {
  agpeya: Cross,
  bible: BookOpen,
  verse: ScrollText,
  reflection: ScrollText,
  mercy: HeartHandshake,
  liturgy: Cross,
  meeting: Flame,
  service: HeartHandshake
};

export function NotebookScreen() {
  const { text } = useTranslations();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.drafts.notebookDraft);
  const { data: entry } = useGetNotebookEntryQuery(todayKey);
  const { data: streak } = useGetNotebookStreakQuery();
  const [saveNotebook, { isLoading }] = useSaveNotebookEntryMutation();

  useEffect(() => {
    if (entry) {
      dispatch(
        setNotebookDraft({
          completedHabits: entry.completedHabits,
          reflection: entry.reflection
        })
      );
    }
  }, [dispatch, entry]);

  async function handleSave() {
    await saveNotebook({
      date: todayKey,
      scoutId: "scout-1",
      completedHabits: draft.completedHabits,
      reflection: draft.reflection
    }).unwrap();
    dispatch(showToast({ tone: "success", message: text.toastNotebookSaved }));
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center md:text-start">
        <h1 className="text-3xl font-black text-primary">{text.spiritualLog}</h1>
        <p className="text-muted-foreground">{text.spiritualSubtitle}</p>
      </header>

      <Card>
        <CardHeader>
          <div>
            <h2 className="text-2xl font-black">{text.dailySpiritual}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{text.today}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
            {draft.completedHabits.length}/{spiritualHabits.length}
          </span>
        </CardHeader>
        <CardContent className="space-y-3">
          {spiritualHabits.map((habit) => {
            const checked = draft.completedHabits.includes(habit.id);
            const Icon = habitIcons[habit.id];
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => dispatch(toggleNotebookHabit(habit.id))}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background/40 p-3 text-start transition hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold">{text[habit.labelKey]}</span>
                    {habit.weekly ? <span className="text-xs text-muted-foreground">{text.weekList}</span> : null}
                  </span>
                </span>
                <span
                  className={`h-6 w-6 rounded-md border ${
                    checked ? "border-primary bg-primary shadow-glow" : "border-border bg-card"
                  }`}
                />
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-black">{text.shortReflection}</h2>
          <LockKeyhole className="h-5 w-5 text-gold" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-gold/30 bg-gold/10 p-3 text-sm text-muted-foreground">
            <LockKeyhole className="mt-0.5 h-4 w-4 text-gold" />
            <p>{text.privacyNotice}</p>
          </div>
          <Textarea
            value={draft.reflection}
            placeholder={text.reflectionPlaceholder}
            onChange={(event) => dispatch(setNotebookReflection(event.target.value))}
          />
          <Button type="button" className="w-full" disabled={isLoading} onClick={handleSave}>
            <Save className="h-4 w-4" />
            {text.saveNotebook}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-black">{text.currentStreak}</h2>
            <Flame className="h-5 w-5 text-burgundy" />
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-end gap-2">
              <span className="font-display text-6xl font-black">{streak?.current ?? 0}</span>
              <span className="pb-3 text-muted-foreground">{text.days}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full electric-flow"
                style={{ width: `${Math.min(((streak?.current ?? 0) / (streak?.target ?? 30)) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-end text-xs text-muted-foreground">
              {(streak?.target ?? 30) - (streak?.current ?? 0)} {text.daysToBadge}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-black">{text.monthlyConsistency}</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{text.less}</span>
              {[0, 1, 2, 3].map((level) => (
                <span key={level} className={cellClass(level)} />
              ))}
              <span>{text.more}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-flow-col grid-rows-7 justify-start gap-1 overflow-x-auto pb-1">
              {(streak?.month ?? []).map((level, index) => (
                <span key={`${index}-${level}`} title={`${level}`} className={cellClass(level)} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cellClass(level: number) {
  const colors = [
    "bg-muted/70",
    "bg-secondary/35",
    "bg-secondary/70",
    "bg-primary/75",
    "bg-primary shadow-glow"
  ];
  return `block h-4 w-4 rounded-[4px] border border-border/30 ${colors[level] ?? colors[0]}`;
}
