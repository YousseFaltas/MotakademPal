import { NextResponse } from "next/server";
import { serverRoster } from "@/lib/server-state";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const scout = serverRoster.find((item) => item.id === id);

  if (!scout) {
    return NextResponse.json({ message: "Scout not found" }, { status: 404 });
  }

  return NextResponse.json(scout);
}
