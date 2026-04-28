import type { Metadata } from "next";
import "./globals.css";
import StatusBadge from "@/components/StatusBadge/StatusBadge";

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
      <body>
        <StatusBadge />
        {children}
      </body>
    </html>
  );
}
