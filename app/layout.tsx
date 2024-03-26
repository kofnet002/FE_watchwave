import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./lib/helper/AppContext";
import { Toaster } from "react-hot-toast";


const inter = Kanit({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });


const logoUrl = process.env.NEXT_PUBLIC_OG_URL;
const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const metadata: Metadata = {
  title: "WatchWave",
  description:
    "A simplified video platform for all your videos.",
  keywords:
    "video, platform, creators, viewers, watchwave, watch, wave, videos",
  themeColor: "#630132",
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
        {/* <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
        <script async src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
        <script>
          const player = new Plyr('#player');
        </script> */}
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
