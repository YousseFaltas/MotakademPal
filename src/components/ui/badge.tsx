import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "cyan" | "gold" | "burgundy" | "olive" | "muted";

const tones: Record<BadgeTone, string> = {
  cyan: "border-primary/30 bg-primary/10 text-primary",
  gold: "border-gold/30 bg-gold/15 text-gold",
  burgundy: "border-burgundy/30 bg-burgundy/15 text-burgundy",
  olive: "border-olive/30 bg-olive/15 text-olive",
  muted: "border-border bg-muted text-muted-foreground"
};

export function Badge({
  className,
  tone = "cyan",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
