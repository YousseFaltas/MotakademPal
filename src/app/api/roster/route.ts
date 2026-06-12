import { NextResponse } from "next/server";
import { serverRoster } from "@/lib/server-state";

export function GET() {
  return NextResponse.json(serverRoster);
}
