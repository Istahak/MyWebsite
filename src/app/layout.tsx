import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Your Name - CSE Portfolio",
  description:
    "Portfolio of a Computer Science and Engineering student from University of Dhaka, showcasing projects and competitive programming achievements.",
  keywords: [
    "CSE",
    "Computer Science",
    "University of Dhaka",
    "Competitive Programming",
    "Portfolio",
    "Software Development",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - CSE Portfolio",
    description:
      "Portfolio of a Computer Science and Engineering student from University of Dhaka",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
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
