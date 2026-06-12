import { NextResponse } from "next/server";
import { serverEvents } from "@/lib/server-state";
import type { EventDraft, ScoutEvent } from "@/types";

export function GET() {
  return NextResponse.json(serverEvents);
}

export async function POST(request: Request) {
  const draft = (await request.json()) as EventDraft;
  const event: ScoutEvent = {
    id: `event-${Date.now()}`,
    title: {
      "ar-EG": draft.title || "فعالية جديدة",
      en: draft.title || "New Event"
    },
    description: {
      "ar-EG": draft.description || "تفاصيل الفعالية هتتضاف قريب.",
      en: draft.description || "Event details will be added soon."
    },
    date: draft.date || new Date().toISOString(),
    timeRange: {
      "ar-EG": "يتحدد لاحقا",
      en: "TBD"
    },
    location: {
      "ar-EG": draft.location || "الكنيسة",
      en: draft.location || "Church"
    },
    leaderName: {
      "ar-EG": "القائد مينا",
      en: "Leader Mina"
    },
    leaderPhone: "+201000000000",
    status: "draft",
    priority: false,
    tags: ["scout", "coptic"],
    requiredGear: [
      { "ar-EG": "الزي الكشفي", en: "Scout uniform" },
      { "ar-EG": "مياه شخصية", en: "Personal water" }
    ],
    coverImage: "/assets/church-courtyard.svg"
  };

  serverEvents.unshift(event);
  return NextResponse.json(event, { status: 201 });
}
