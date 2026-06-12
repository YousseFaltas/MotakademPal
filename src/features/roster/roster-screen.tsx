"use client";

import { Search, UserRound } from "lucide-react";
import Image from "next/image";
import { formatNumber } from "@/i18n";
import { useGetRosterQuery } from "@/store/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRosterSearch } from "@/store/slices/filtersSlice";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/components/layout/use-translations";

export function RosterScreen() {
  const { text, locale, localize } = useTranslations();
  const dispatch = useAppDispatch();
  const rosterSearch = useAppSelector((state) => state.filters.rosterSearch);
  const { data: roster = [] } = useGetRosterQuery();
  const filtered = roster.filter((scout) =>
    `${localize(scout.displayName)} ${localize(scout.rank)} ${localize(scout.patrol)}`
      .toLowerCase()
      .includes(rosterSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-black text-primary">{text.activeRoster}</h1>
        <p className="mt-2 text-muted-foreground">{text.parishName}</p>
      </header>

      <Card>
        <CardHeader className="flex-col md:flex-row md:items-center">
          <h2 className="text-xl font-black">{text.roster}</h2>
          <label className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <Input
              value={rosterSearch}
              placeholder={text.searchScouts}
              className="ps-10"
              onChange={(event) => dispatch(setRosterSearch(event.target.value))}
            />
          </label>
        </CardHeader>
        <CardContent className="grid gap-3">
          {filtered.map((scout) => (
            <div key={scout.id} className="grid gap-4 rounded-lg border border-border bg-background/45 p-4 md:grid-cols-[1fr_160px_180px] md:items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={scout.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-primary/35"
                />
                <div>
                  <p className="font-black">{localize(scout.displayName)}</p>
                  <p className="text-sm text-muted-foreground">{localize(scout.patrol)}</p>
                </div>
              </div>
              <Badge tone={scout.level > 3 ? "cyan" : "muted"} className="w-fit">
                <UserRound className="h-3.5 w-3.5" />
                {localize(scout.rank)}
              </Badge>
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{text.attendance}</span>
                  <span>{formatNumber(scout.attendance, locale)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${scout.attendance}%` }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
