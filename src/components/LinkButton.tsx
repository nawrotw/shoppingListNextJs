import { ReactNode } from "react";
import { cn } from "@/lib/tailwindUtils";

export interface LinkButtonProps {
  children?: ReactNode;
  className?: string;
}

export const LinkButton = ({ children, className }: LinkButtonProps) => {
  return <div
    className={cn(
      'inline-flex items-center px-4 py-2 text-primary-foreground cursor-pointer hover:bg-secondary',
      className
    )}
  >
    {children}
  </div>;
}
