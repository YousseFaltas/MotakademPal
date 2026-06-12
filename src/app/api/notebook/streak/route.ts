import { NextResponse } from "next/server";
import { serverNotebookStreak } from "@/lib/server-state";

export function GET() {
  return NextResponse.json(serverNotebookStreak);
}
