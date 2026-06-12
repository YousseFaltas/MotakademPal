"use client";

import { useEffect } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/slices/uiSlice";

export function ToastHost() {
  const toast = useAppSelector((state) => state.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => dispatch(clearToast()), 2600);
    return () => window.clearTimeout(timer);
  }, [dispatch, toast]);

  if (!toast) return null;

  const Icon = toast.tone === "success" ? CheckCircle2 : toast.tone === "error" ? XCircle : Info;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[80] mx-auto flex max-w-md items-center gap-3 rounded-xl border border-border bg-popover/95 px-4 py-3 text-popover-foreground shadow-soft backdrop-blur md:bottom-6">
      <Icon className="h-5 w-5 text-primary" />
      <p className="text-sm font-semibold">{toast.message}</p>
    </div>
  );
}
