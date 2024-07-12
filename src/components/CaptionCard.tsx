import { ReactNode } from "react";
import { cn } from "@/lib/tailwindUtils";

export interface LinkButtonProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

export const CaptionCard = ({ title, children, className }: LinkButtonProps) => {
  return <div
    className={cn('inline-block relative mt-0 p-4 border rounded text-foreground min-w-20', className)}
  >
    {children}
    <div className='absolute left-2 text-sm bg-card px-2 top-0 -translate-y-1/2'>{title}</div>
  </div>;
}
