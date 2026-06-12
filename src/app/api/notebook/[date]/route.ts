import { NextResponse } from "next/server";
import { serverNotebookEntries } from "@/lib/server-state";
import type { NotebookEntry, SpiritualHabitId } from "@/types";

type RouteContext = {
  params: Promise<{ date: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { date } = await context.params;
  const entry =
    serverNotebookEntries.find((item) => item.date === date) ??
    ({
      id: `entry-${date}`,
      scoutId: "scout-1",
      date,
      completedHabits: [],
      reflection: "",
      isPrivate: true
    } satisfies NotebookEntry);

  return NextResponse.json(entry);
}

export async function PUT(request: Request, context: RouteContext) {
  const { date } = await context.params;
  const body = (await request.json()) as {
    scoutId: string;
    completedHabits: SpiritualHabitId[];
    reflection: string;
  };
  const existing = serverNotebookEntries.find((item) => item.date === date);

  if (existing) {
    existing.completedHabits = body.completedHabits;
    existing.reflection = body.reflection;
    return NextResponse.json(existing);
  }

  const entry: NotebookEntry = {
    id: `entry-${date}`,
    scoutId: body.scoutId,
    date,
    completedHabits: body.completedHabits,
    reflection: body.reflection,
    isPrivate: true
  };
  serverNotebookEntries.push(entry);

  return NextResponse.json(entry, { status: 201 });
}
