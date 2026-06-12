import { NextResponse } from "next/server";
import { serverDocuments, serverRoster } from "@/lib/server-state";
import type { DocumentStatus, ScoutDocument } from "@/types";

export function GET() {
  return NextResponse.json(serverDocuments);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    scoutId: string;
    type: ScoutDocument["type"];
    fileName: string;
  };
  const scout = serverRoster.find((item) => item.id === body.scoutId);
  const document: ScoutDocument = {
    id: `doc-${Date.now()}`,
    scoutId: body.scoutId,
    scoutName: scout?.displayName ?? { "ar-EG": "كشاف", en: "Scout" },
    type: body.type,
    submittedAt: new Date().toISOString(),
    status: "pending",
    fileUrl: `https://mock.supabase.co/storage/v1/object/public/scout-documents/${body.scoutId}/${encodeURIComponent(body.fileName)}`
  };

  serverDocuments.unshift(document);
  return NextResponse.json(document, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    id: string;
    status: DocumentStatus;
    rejectionReason?: string;
  };
  const document = serverDocuments.find((item) => item.id === body.id);

  if (!document) {
    return NextResponse.json({ message: "Document not found" }, { status: 404 });
  }

  document.status = body.status;
  document.rejectionReason = body.rejectionReason;
  return NextResponse.json(document);
}
