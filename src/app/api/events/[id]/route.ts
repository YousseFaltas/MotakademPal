import { NextResponse } from "next/server";
import { serverEvents } from "@/lib/server-state";
import type { EventStatus } from "@/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const event = serverEvents.find((item) => item.id === id);

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Partial<{
    title: string;
    date: string;
    location: string;
    description: string;
    status: EventStatus;
  }>;
  const event = serverEvents.find((item) => item.id === id);

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  if (body.title) {
    event.title = { "ar-EG": body.title, en: body.title };
  }
  if (body.description) {
    event.description = { "ar-EG": body.description, en: body.description };
  }
  if (body.date) {
    event.date = body.date;
  }
  if (body.location) {
    event.location = { "ar-EG": body.location, en: body.location };
  }
  if (body.status) {
    event.status = body.status;
  }

  return NextResponse.json(event);
}
