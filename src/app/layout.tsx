import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist
import { Inter as Inter_Mono } from 'next/font/google'; // Using Inter for mono as well for consistency, or you can pick another mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const interSans = Inter({ // Changed from geistSans
  variable: '--font-inter-sans', // Changed variable name
  subsets: ['latin'],
});

const interMono = Inter_Mono({ // Changed from geistMono
  variable: '--font-inter-mono', // Changed variable name
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kit: AI Recipe Generator',
  description: 'Your AI Kitchen Assistant for custom recipes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${interMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
