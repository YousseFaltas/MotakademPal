import type { Metadata } from "next";
import { StoreProvider } from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motakadem Coptic Scouts",
  description: "Arabic-first Coptic Orthodox scout portal with Redux Toolkit and RTK Query."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar-EG" dir="rtl" className="dark" suppressHydrationWarning>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
