"use client"

import { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/tailwindUtils";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link> & { icon: ReactNode, text: string };

export function NavLink(props: NavLinkProps) {
  const pathName = usePathname();
  const isCurrentPath = pathName === props.href;
  const { className, icon, text, ...restProps } = props;
  return <Link {...restProps} className={cn(
    "flex-1 flex justify-center",
    "p-4 hover:bg-secondary hover:text-secondary-foreground",
    // "focus-visible:bg-secondary focus-visible:text-secondary-foreground",
    isCurrentPath && "text-primary-foreground",
    'border',
    className
  )}
  >
    <div className='flex flex-col items-center'>
      {icon}
      {text}
    </div>
  </Link>
}
