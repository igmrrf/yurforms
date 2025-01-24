import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { baseUrl } from "@/config/constants";
import { Toaster } from "@/components/ui/toaster";
import {ThemeProvider} from "next-themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YurForms",
  description: "YurForms limited Summer On Chain print.",
  icons: [`${baseUrl}/logo.svg`],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "YurForms",
    description: "YurForms: Fill a form once and never again",
    images: `${baseUrl}/logo.svg`,
    url: baseUrl,
    siteName: "YurForms: Fill a form once and never again",
  },

  keywords: ["Limited", "Trade", "Forms", "YurForms"],
  applicationName: "YurForms",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
