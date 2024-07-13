import { ComponentProps } from "react";
import { cn } from "@/lib/tailwindUtils";
import Link from "next/link";

export const LinkButton = (props: ComponentProps<typeof Link>) => {

  const { className, ...restProps } = props;

  return <Link {...restProps} className={cn(
    'inline-flex items-center px-4 py-2 text-primary-foreground cursor-pointer hover:bg-secondary',
    props.className
  )}
  />
}
