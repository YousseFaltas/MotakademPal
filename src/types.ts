import type { MessageKey } from "./messages/ar-EG";

export type Role = "scout" | "captain";
export type EventStatus = "draft" | "published";
export type RsvpStatus = "going" | "declined" | "pending";
export type DocumentStatus = "pending" | "approved" | "rejected";
export type ThemeMode = "dark" | "light";

export type LocalizedText = {
  "ar-EG": string;
  en: string;
};

export type EventTag = "coptic" | "scout" | "service" | "camp" | "sports" | "training";

export type ScoutEvent = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  timeRange: LocalizedText;
  location: LocalizedText;
  leaderName: LocalizedText;
  leaderPhone: string;
  status: EventStatus;
  priority: boolean;
  tags: EventTag[];
  requiredGear: LocalizedText[];
  coverImage: string;
};

export type Rsvp = {
  id: string;
  eventId: string;
  scoutId: string;
  status: RsvpStatus;
};

export type SpiritualHabitId =
  | "agpeya"
  | "bible"
  | "verse"
  | "reflection"
  | "mercy"
  | "liturgy"
  | "meeting"
  | "service";

export type SpiritualHabit = {
  id: SpiritualHabitId;
  labelKey: MessageKey;
  weekly?: boolean;
};

export type NotebookEntry = {
  id: string;
  scoutId: string;
  date: string;
  completedHabits: SpiritualHabitId[];
  reflection: string;
  isPrivate: true;
};

export type NotebookStreak = {
  current: number;
  target: number;
  month: number[];
};

export type ScoutProfile = {
  id: string;
  displayName: LocalizedText;
  initials: string;
  role: Role;
  rank: LocalizedText;
  patrol: LocalizedText;
  attendance: number;
  progress: number;
  level: number;
  emergencyContact: string;
  avatar: string;
};

export type ScoutDocument = {
  id: string;
  scoutId: string;
  scoutName: LocalizedText;
  type: "guardianConsent" | "medicalForm" | "baptismCertificate";
  submittedAt: string;
  status: DocumentStatus;
  fileUrl: string;
  rejectionReason?: string;
};

export type DashboardSummary = {
  totalYouth: number;
  newThisMonth: number;
  upcomingRsvpPercent: number;
  nextEventName: LocalizedText;
  notebookConsistency: number;
  recentActivity: LocalizedText[];
};

export type EventDraft = {
  title: string;
  date: string;
  location: string;
  description: string;
  targetRank: string;
};
