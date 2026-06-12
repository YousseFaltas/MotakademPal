import { NextResponse } from "next/server";
import { serverDashboardSummary } from "@/lib/server-state";

export function GET() {
  return NextResponse.json(serverDashboardSummary);
}
