import { ReactNode } from "react";
import { cn } from "@/lib/tailwindUtils";

type ViewContentProps = {
  children: ReactNode;
  className?: string;
};
export const ViewContent = ({ children, className }: ViewContentProps) => {
  return <main className={cn("px-4 py-2 flex-1 overflow-y-auto", className)}>
    {children}
  </main>
}
