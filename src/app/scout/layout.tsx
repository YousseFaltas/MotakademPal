import { ScoutShell } from "@/components/layout/scout-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ScoutShell>{children}</ScoutShell>;
}
