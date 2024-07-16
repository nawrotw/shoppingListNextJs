import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/tailwindUtils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NavigationBar } from "@/components/composite/NavigationBar";

const fontSans = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shopping List",
  description: "shoppingListApp, next.js",
};

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={cn(
      "h-dvh flex flex-col bg-background",
      'font-sans antialiased',
      fontSans.variable
    )}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <NavigationBar className=''/>
      <SpeedInsights/>
    </ThemeProvider>
    </body>
    </html>
  );
}
