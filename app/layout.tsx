import type { Metadata } from "next";
import { Great_Vibes, Cinzel, Noto_Serif, Platypi } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Hoàng Long & Ngọc Yến - Wedding Invitation",
  description:
    "Join us as we celebrate our special day. RSVP for our wedding ceremony and reception.",
  authors: [{ name: "Long" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  openGraph: {
    title: "Hoàng Long & Ngpc Yến - Wedding Invitation",
    description: "Join us as we celebrate our special day",
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
