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
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, mixed, children, className, textGap } = props;

  return <div className={cn(`flex gap-${textGap ?? 2}`, className)}>
    {checked && <CheckedIcon/>}
    {!checked && !mixed && <UncheckedIcon/>}
    {!checked && mixed && <CheckboxMixedIcon/>}
    {children}
  </div>
}

