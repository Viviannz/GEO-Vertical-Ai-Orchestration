import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS Reality Check | Validate Your AI Startup",
  description: "5-agent validation system to validate your AI startup idea before writing code. Avoid the GPT wrapper graveyard.",
  authors: [{ name: "Dr. Vivian Nzegbulem" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gradient-to-br from-danger-50 via-white to-orange-50">
        {children}
      </body>
    </html>
  );
}
