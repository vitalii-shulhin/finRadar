import type { Metadata } from "next";
import { Noto_Sans, Raleway } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { i18n } from "@/i18n/config";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

// Minimal root metadata - language-specific metadata is in [lang]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

// Root layout wraps all pages - keep it minimal
// Language-specific content is handled in [lang]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detect language from URL for proper lang attribute
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // Extract lang from pathname (e.g., /uk/... -> uk)
  let lang: typeof i18n.locales[number] = i18n.defaultLocale;
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      lang = locale;
      break;
    }
  }

  return (
    <html lang={lang}>
      <body className={`${notoSans.variable} ${raleway.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
