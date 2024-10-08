"use client"

import CheckedIcon from "@/icons/CheckedIcon";
import UncheckedIcon from "@/icons/UncheckedIcon";
import CheckboxMixedIcon from "@/icons/CheckboxMixedIcon";
import { ReactNode } from "react";
import { cn } from "@/lib/tailwindUtils";

export interface CheckboxProps {
  checked?: boolean;
  mixed?: boolean;
  className?: string;
  children?: ReactNode;
  textGap?: number;
  size?: number | string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, mixed, children, className, textGap, size } = props;

  return <div className={cn(`flex gap-${textGap ?? 2}`, className)}>
    {checked && <CheckedIcon size={size}/>}
    {!checked && !mixed && <UncheckedIcon size={size}/>}
    {!checked && mixed && <CheckboxMixedIcon size={size}/>}
    {children}
  </div>
}

