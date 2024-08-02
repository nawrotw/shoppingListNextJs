"use client"

import { ReactNode, ComponentProps, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/tailwindUtils";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link> & { icon: ReactNode, text: string };

export function NavLink(props: NavLinkProps) {

  const { className, icon, text, ...restProps } = props;

  const pathName = usePathname();
  const isCurrentPath = useMemo(
    () => new RegExp(`^${props.href.toString()}`).test(pathName),
    [pathName, props.href]
  );

  return <Link {...restProps} className={cn(
    "flex-1 flex justify-center border p-4 hover:bg-secondary",
    isCurrentPath && "text-primary-foreground",
    className
  )}
  >
    <div className='flex flex-col items-center'>
      {icon}
      {text}
    </div>
  </Link>
}
