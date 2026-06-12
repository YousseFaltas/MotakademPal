import { CaptainShell } from "@/components/layout/captain-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CaptainShell>{children}</CaptainShell>;
}
