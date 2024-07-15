import { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/tailwindUtils";
import Link from "next/link";

export type LinkButtonProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href?: string;
  disabled?: boolean;
};

export const LinkButton = (props: LinkButtonProps) => {

  const { className, href = '', onClick, disabled, ...restProps } = props;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href) return;

    e.preventDefault();
    if (!onClick) {
      console.warn('[LinkButton] onClick nor href is defined. Click has no effect');
      return;
    }
    onClick(e);
  }

  return <Link
    {...restProps}
    className={cn(
      'inline-flex items-center px-4 py-2 text-primary-foreground cursor-pointer hover:bg-secondary',
      disabled && "cursor-not-allowed text-muted-foreground",
      props.className
    )}
    href={href}
    onClick={handleClick}
  />
}
