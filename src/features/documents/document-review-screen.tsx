"use client";

import { FileText, Inbox, ShieldCheck, XCircle } from "lucide-react";
import type { DocumentStatus, ScoutDocument } from "@/types";
import { useGetDocumentsQuery, useReviewDocumentMutation } from "@/store/api/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/slices/uiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";

const columns: { status: DocumentStatus; titleKey: "pendingReview" | "approved" | "needsRevision" }[] = [
  { status: "pending", titleKey: "pendingReview" },
  { status: "approved", titleKey: "approved" },
  { status: "rejected", titleKey: "needsRevision" }
];

export function DocumentReviewScreen() {
  const { text } = useTranslations();
  const { data: documents = [] } = useGetDocumentsQuery();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-black text-primary">{text.reviewCenter}</h1>
        <p className="mt-2 text-muted-foreground">{text.documentReview}</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <DocumentColumn
            key={column.status}
            title={text[column.titleKey]}
            status={column.status}
            documents={documents.filter((document) => document.status === column.status)}
          />
        ))}
      </div>
    </div>
  );
}

function DocumentColumn({
  title,
  status,
  documents
}: {
  title: string;
  status: DocumentStatus;
  documents: ScoutDocument[];
}) {
  const { text } = useTranslations();

  return (
    <Card className="min-h-96 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-black">{title}</h2>
        <Badge tone={status === "pending" ? "cyan" : status === "approved" ? "olive" : "burgundy"}>
          {documents.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {documents.length ? (
          documents.map((document) => <DocumentCard key={document.id} document={document} />)
        ) : (
          <div className="flex h-36 flex-col items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
            <Inbox className="mb-2 h-6 w-6" />
            <span className="text-sm">{text.noItems}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

function DocumentCard({ document }: { document: ScoutDocument }) {
  const { text, localize } = useTranslations();
  const dispatch = useAppDispatch();
  const [reviewDocument, { isLoading }] = useReviewDocumentMutation();
  const typeLabel = text[document.type];

  async function review(status: DocumentStatus) {
    await reviewDocument({ id: document.id, status }).unwrap();
    dispatch(showToast({ tone: "success", message: text.toastDocumentReviewed }));
  }

  return (
    <div className="rounded-lg border border-border bg-background/45 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <p className="font-black">{localize(document.scoutName)}</p>
            <p className="text-xs text-muted-foreground">{typeLabel}</p>
          </div>
        </div>
        <Badge tone={document.status === "approved" ? "olive" : document.status === "rejected" ? "burgundy" : "cyan"}>
          {text[document.status === "approved" ? "approved" : document.status === "rejected" ? "needsRevision" : "pendingReview"]}
        </Badge>
      </div>
      {document.status === "pending" ? (
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" size="sm" disabled={isLoading} onClick={() => review("approved")}>
            <ShieldCheck className="h-4 w-4" />
            {text.approve}
          </Button>
          <Button type="button" size="sm" variant="danger" disabled={isLoading} onClick={() => review("rejected")}>
            <XCircle className="h-4 w-4" />
            {text.reject}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
