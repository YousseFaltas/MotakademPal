import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DashboardSummary,
  DocumentStatus,
  EventDraft,
  NotebookEntry,
  NotebookStreak,
  Rsvp,
  RsvpStatus,
  ScoutDocument,
  ScoutEvent,
  ScoutProfile,
  SpiritualHabitId
} from "@/types";

type UpdateRsvpPayload = {
  eventId: string;
  scoutId: string;
  status: RsvpStatus;
};

type SaveNotebookPayload = {
  date: string;
  scoutId: string;
  completedHabits: SpiritualHabitId[];
  reflection: string;
};

type ReviewDocumentPayload = {
  id: string;
  status: DocumentStatus;
  rejectionReason?: string;
};

type UploadDocumentPayload = {
  scoutId: string;
  type: ScoutDocument["type"];
  fileName: string;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Event", "Rsvp", "Notebook", "Roster", "Document", "Dashboard"],
  endpoints: (builder) => ({
    getEvents: builder.query<ScoutEvent[], void>({
      query: () => "/events",
      providesTags: (result) =>
        result
          ? [
              ...result.map((event) => ({ type: "Event" as const, id: event.id })),
              { type: "Event" as const, id: "LIST" }
            ]
          : [{ type: "Event" as const, id: "LIST" }]
    }),
    getEvent: builder.query<ScoutEvent, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Event", id }]
    }),
    createEvent: builder.mutation<ScoutEvent, EventDraft>({
      query: (draft) => ({ url: "/events", method: "POST", body: draft }),
      invalidatesTags: [
        { type: "Event", id: "LIST" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    updateEvent: builder.mutation<ScoutEvent, Partial<EventDraft> & { id: string }>({
      query: ({ id, ...draft }) => ({ url: `/events/${id}`, method: "PATCH", body: draft }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" }
      ]
    }),
    publishEvent: builder.mutation<ScoutEvent, string>({
      query: (id) => ({ url: `/events/${id}`, method: "PATCH", body: { status: "published" } }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    getRsvps: builder.query<Rsvp[], void>({
      query: () => "/rsvps",
      providesTags: (result) =>
        result
          ? [
              ...result.map((rsvp) => ({ type: "Rsvp" as const, id: rsvp.id })),
              { type: "Rsvp" as const, id: "LIST" }
            ]
          : [{ type: "Rsvp" as const, id: "LIST" }]
    }),
    updateRsvp: builder.mutation<Rsvp, UpdateRsvpPayload>({
      query: (body) => ({ url: "/rsvps", method: "PATCH", body }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          baseApi.util.updateQueryData("getRsvps", undefined, (draft) => {
            const existing = draft.find(
              (rsvp) => rsvp.eventId === body.eventId && rsvp.scoutId === body.scoutId
            );
            if (existing) {
              existing.status = body.status;
            } else {
              draft.push({
                id: `optimistic-${body.eventId}`,
                eventId: body.eventId,
                scoutId: body.scoutId,
                status: body.status
              });
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [
        { type: "Rsvp", id: "LIST" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    getNotebookEntry: builder.query<NotebookEntry, string>({
      query: (date) => `/notebook/${date}`,
      providesTags: (_result, _error, date) => [{ type: "Notebook", id: date }]
    }),
    saveNotebookEntry: builder.mutation<NotebookEntry, SaveNotebookPayload>({
      query: ({ date, ...body }) => ({ url: `/notebook/${date}`, method: "PUT", body }),
      async onQueryStarted({ date, ...body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          baseApi.util.updateQueryData("getNotebookEntry", date, (draft) => {
            draft.completedHabits = body.completedHabits;
            draft.reflection = body.reflection;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_result, _error, { date }) => [
        { type: "Notebook", id: date },
        { type: "Notebook", id: "STREAK" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    getNotebookStreak: builder.query<NotebookStreak, void>({
      query: () => "/notebook/streak",
      providesTags: [{ type: "Notebook", id: "STREAK" }]
    }),
    getRoster: builder.query<ScoutProfile[], void>({
      query: () => "/roster",
      providesTags: (result) =>
        result
          ? [
              ...result.map((scout) => ({ type: "Roster" as const, id: scout.id })),
              { type: "Roster" as const, id: "LIST" }
            ]
          : [{ type: "Roster" as const, id: "LIST" }]
    }),
    getScoutDetails: builder.query<ScoutProfile, string>({
      query: (id) => `/roster/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Roster", id }]
    }),
    getDocuments: builder.query<ScoutDocument[], void>({
      query: () => "/documents",
      providesTags: (result) =>
        result
          ? [
              ...result.map((document) => ({ type: "Document" as const, id: document.id })),
              { type: "Document" as const, id: "LIST" }
            ]
          : [{ type: "Document" as const, id: "LIST" }]
    }),
    uploadDocument: builder.mutation<ScoutDocument, UploadDocumentPayload>({
      query: (body) => ({ url: "/documents", method: "POST", body }),
      invalidatesTags: [
        { type: "Document", id: "LIST" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    reviewDocument: builder.mutation<ScoutDocument, ReviewDocumentPayload>({
      query: ({ id, ...body }) => ({ url: "/documents", method: "PATCH", body: { id, ...body } }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          baseApi.util.updateQueryData("getDocuments", undefined, (draft) => {
            const document = draft.find((item) => item.id === body.id);
            if (document) {
              document.status = body.status;
              document.rejectionReason = body.rejectionReason;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Document", id },
        { type: "Document", id: "LIST" },
        { type: "Dashboard", id: "SUMMARY" }
      ]
    }),
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/dashboard",
      providesTags: [{ type: "Dashboard", id: "SUMMARY" }]
    })
  })
});

export const {
  useCreateEventMutation,
  useGetDashboardSummaryQuery,
  useGetDocumentsQuery,
  useGetEventQuery,
  useGetEventsQuery,
  useGetNotebookEntryQuery,
  useGetNotebookStreakQuery,
  useGetRosterQuery,
  useGetRsvpsQuery,
  useGetScoutDetailsQuery,
  usePublishEventMutation,
  useReviewDocumentMutation,
  useSaveNotebookEntryMutation,
  useUpdateEventMutation,
  useUpdateRsvpMutation,
  useUploadDocumentMutation
} = baseApi;
