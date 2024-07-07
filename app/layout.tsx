import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contest Analyzer",
  description: "AtCoderのパフォーマンスを分析します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
