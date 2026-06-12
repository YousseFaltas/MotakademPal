import { NextResponse } from "next/server";
import { serverRsvps } from "@/lib/server-state";
import type { RsvpStatus } from "@/types";

export function GET() {
  return NextResponse.json(serverRsvps);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    eventId: string;
    scoutId: string;
    status: RsvpStatus;
  };
  const existing = serverRsvps.find(
    (rsvp) => rsvp.eventId === body.eventId && rsvp.scoutId === body.scoutId
  );

  if (existing) {
    existing.status = body.status;
    return NextResponse.json(existing);
  }

  const rsvp = {
    id: `rsvp-${Date.now()}`,
    eventId: body.eventId,
    scoutId: body.scoutId,
    status: body.status
  };

  serverRsvps.push(rsvp);
  return NextResponse.json(rsvp, { status: 201 });
}
