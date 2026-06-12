import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-lg border border-input bg-background/60 px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
