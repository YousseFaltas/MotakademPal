"use client";

import { FileCheck2, Phone, Shield, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useGetDocumentsQuery, useGetRosterQuery } from "@/store/api/baseApi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "@/components/layout/use-translations";

export function ProfileScreen() {
  const { text, localize } = useTranslations();
  const { data: roster = [] } = useGetRosterQuery();
  const { data: documents = [] } = useGetDocumentsQuery();
  const scout = roster[0];
  const mine = documents.filter((document) => document.scoutId === "scout-1");

  if (!scout) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src={scout.avatar}
              alt=""
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border border-primary/40"
            />
            <div>
              <Badge tone="gold" className="mb-2">
                <Shield className="h-3.5 w-3.5" />
                {text.profileTitle}
              </Badge>
              <h1 className="text-3xl font-black text-primary">{localize(scout.displayName)}</h1>
              <p className="text-muted-foreground">{localize(scout.patrol)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <InfoTile icon={UserRound} label={text.rank} value={localize(scout.rank)} />
          <InfoTile icon={Shield} label={text.patrol} value={localize(scout.patrol)} />
          <InfoTile icon={Phone} label={text.emergencyContact} value={scout.emergencyContact} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-black">{text.documentsStatus}</h2>
          <FileCheck2 className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="space-y-3">
          {(["guardianConsent", "medicalForm", "baptismCertificate"] as const).map((type) => {
            const document = mine.find((item) => item.type === type);
            return (
              <div key={type} className="flex items-center justify-between rounded-lg border border-border bg-background/45 p-4">
                <span className="font-bold">{text[type]}</span>
                <Badge tone={document ? "cyan" : "burgundy"}>
                  {document ? text.uploaded : text.missing}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/45 p-4">
      <Icon className="mb-3 h-5 w-5 text-primary" />
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
