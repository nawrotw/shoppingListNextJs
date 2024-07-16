import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactElement } from "react";
import { ThemePicker } from "@/components/ThemePicker";
import { cn } from "@/lib/tailwindUtils";
import { Roboto } from "next/font/google";

const fontSans = Roboto({
  weight: ['300','400', '500'],
  subsets: ['latin'],
  variable: "--font-sans",
});

// eslint-disable-next-line react/display-name
export const themeWrapper = <T, >(ComponentFn: (props: T) => ReactElement) => (props: T) => {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className={cn("font-sans antialiased", fontSans.variable)}>
        <div className='fixed top-1 right-1'><ThemePicker/></div>
        {ComponentFn(props)}
      </div>
    </ThemeProvider>
  );
};
