import { ReactNode } from "react";
import { LinkButton } from "@/components/LinkButton";
import { ChevronLeft, Plus } from "lucide-react";

type IconType = 'arrowLeft' | 'plus';

const icons: Record<IconType, ReactNode> = {
  arrowLeft: <ChevronLeft className="size-6 -ml-1.5 -mr-0.5"/>,
  plus: <Plus className="size-6"/>,
}

export interface HeaderProps {
  title: string;
  leftText?: string;
  leftIcon?: IconType;
  rightText?: string;
  rightIcon?: IconType;
}

export const Header = (props: HeaderProps) => {

  const { title, leftText, leftIcon, rightText, rightIcon } = props;
  return <div className="border-b flex items-stretch h-12">
    <div className="flex-1 flex ">
      {leftIcon && !leftText && icons[leftIcon]}
      {leftText &&
        <LinkButton>
          {leftIcon && icons[leftIcon]}
          {leftText}
        </LinkButton>
      }
    </div>
    <div className='self-center text-center font-medium'>{title}</div>
    <div className="flex-1 flex justify-end items-center">
      {(rightText || rightIcon) &&
        <LinkButton className='h-full'>
          {rightText}
          {rightIcon && icons[rightIcon]}
        </LinkButton>
      }
    </div>
  </div>
}
