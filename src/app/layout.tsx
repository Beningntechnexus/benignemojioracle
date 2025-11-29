import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emoji Oracle',
  description: 'Reveal your fate with the power of emojis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Script
          src='//libtl.com/sdk.js'
          data-zone='10252822'
          data-sdk='show_10252822'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
