import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarah Camacho — Student Insights",
  description: "Newsela student reading report",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
