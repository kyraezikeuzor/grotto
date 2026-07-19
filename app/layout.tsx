import type { Metadata } from "next";
import { sfPro } from './fonts'
import "./globals.css";


export const metadata: Metadata = {
  title: "Grotto",
  description: "Grotto is a platform for creating and sharing your own Instagram mockups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sfPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
