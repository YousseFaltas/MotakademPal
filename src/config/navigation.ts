import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Gauge,
  Grid2X2,
  PlusCircle,
  User,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MessageKey } from "@/messages/ar-EG";

export type NavigationItem = {
  href: string;
  labelKey: MessageKey;
  icon: LucideIcon;
};

export const scoutNavigation: NavigationItem[] = [
  { href: "/scout/feed", labelKey: "feed", icon: Grid2X2 },
  { href: "/scout/calendar", labelKey: "events", icon: CalendarDays },
  { href: "/scout/notebook", labelKey: "notebook", icon: BookOpen },
  { href: "/captain/dashboard", labelKey: "roster", icon: Users },
  { href: "/scout/profile", labelKey: "profile", icon: User }
];

export const captainNavigation: NavigationItem[] = [
  { href: "/captain/dashboard", labelKey: "dashboard", icon: Gauge },
  { href: "/captain/events", labelKey: "eventStudio", icon: PlusCircle },
  { href: "/captain/documents", labelKey: "documentReview", icon: ClipboardList },
  { href: "/captain/roster", labelKey: "roster", icon: Users }
];
