import type { Metadata } from "next";
import { Great_Vibes, Cinzel, Noto_Serif } from "next/font/google";
import "./globals.css";
import { AppToaster } from "@/components/ui/toaster";

const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageTitle = "Hoàng Long & Ngọc Yến - Wedding Invitation";
const pageDescription =
  "Join us as we celebrate our special day. RSVP for our wedding ceremony and reception.";
const shareImage = "/2O4A0125-pc.jpg";
const appIcon = "/2O4A9869.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDescription,
  authors: [{ name: "Long" }],
  icons: {
    icon: [{ url: appIcon, type: "image/jpeg" }],
    shortcut: [{ url: appIcon, type: "image/jpeg" }],
    apple: [{ url: appIcon, type: "image/jpeg" }],
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    siteName: pageTitle,
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Hoàng Long & Ngọc Yến wedding portrait",
      },
    ],
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${scriptFont.variable} font-body antialiased bg-linear-to-br from-cream-50 via-pink-50 to-neutral-50`}
      >
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
