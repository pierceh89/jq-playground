import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "jq tutorial & playground",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
