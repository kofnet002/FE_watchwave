import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./lib/helper/AppContext";
import { Toaster } from "react-hot-toast";
import Script from 'next/script';

const inter = Kanit({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });


const logoUrl = process.env.NEXT_PUBLIC_OG_URL;
const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const metadata: Metadata = {
  title: "WatchWave",
  description:
    "A simplified video platform for all your videos.",
  keywords:
    "video, platform, creators, viewers, watchwave, watch, wave, videos",
  openGraph: {
    title: "WatchWave",
    description:
      "A simplified video platform for all your videos",
    url: frontEndUrl,
    images: logoUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <Script async src='./script.js'></Script> */}
      </head>
      <body className={inter.className}>
        <ContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
