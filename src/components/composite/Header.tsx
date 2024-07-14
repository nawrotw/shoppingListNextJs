'use client'
import { ReactNode, MouseEvent } from "react";
import { LinkButton } from "@/components/LinkButton";
import { ChevronLeft, Plus } from "lucide-react";

type IconType = 'arrowLeft' | 'plus';

const icons: Record<IconType, ReactNode> = {
  arrowLeft: <ChevronLeft className="size-6 -ml-1.5 -mr-0.5"/>,
  plus: <Plus className="size-6"/>,
}

export interface ActionProps {
  text?: string;
  icon?: IconType;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
}

export interface HeaderProps {
  title: string;
  left?: ActionProps;
  right?: ActionProps;
}

export const Header = (props: HeaderProps) => {
  const { title, left, right } = props;

  return <div className="border-b flex items-stretch h-12">
    <div className="flex-1 flex ">
      {left && <HeaderAction {...left}/>}
    </div>
    <div className='self-center text-center font-medium'>
      {title}
    </div>
    <div className="flex-1 flex justify-end">
      {right && <HeaderAction {...right} iconRight/>}
    </div>
  </div>
}

function HeaderAction({ text, icon, iconRight, href = '', onClick, disabled }: ActionProps & { iconRight?: boolean }) {
  return <LinkButton href={href} className='h-full' onClick={onClick} disabled={disabled}>
    {icon && !iconRight && icons[icon]}
    {text}
    {icon && iconRight && icons[icon]}
  </LinkButton>
}
