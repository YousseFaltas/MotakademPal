import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
