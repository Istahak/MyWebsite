import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Inter and JetBrains Mono have no Bangla glyphs; this face covers only the Bengali range.
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: { google: "u87y1bu6v3T3jzJOlCkmPLuP1jCoqfZpxXTpt8t9NO8" },
  title: "Istahak's Portfolio",
  description:
    "Portfolio of Istahak Islam, a Software Engineer at Enosis Solutions BD and CSE graduate from University of Dhaka, showcasing projects and competitive programming achievements.",
  keywords: [
    "Istahak Islam",
    "CSE",
    "Computer Science",
    "University of Dhaka",
    "Competitive Programming",
    "Portfolio",
    "Software Development",
  ],
  authors: [{ name: "Istahak Islam" }],
  openGraph: {
    title: "Istahak's Portfolio",
    description:
      "Portfolio of Istahak Islam, Software Engineer at Enosis Solutions BD and CSE graduate from University of Dhaka",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script sets the theme class before first paint, so a dark-mode visitor never sees a white flash.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansBengali.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
