import { NavLink } from "@/components/composite/navigation/NavLink";
import { cn } from "@/lib/tailwindUtils";
import { PackageSearch, CookingPot, UserPen } from "lucide-react";
import ListIcon from "@/icons/ListIcon";

export interface NavigationBarProps {
  className?: string;
}

const iconSize = 32;
export const NavigationBar = ({ className }: NavigationBarProps) => {

  return <div className={cn('flex items-center', className)}>
    <NavLink href='/lists' icon={<ListIcon size={iconSize}/>} text='Lists'/>
    <NavLink href='/products' icon={<PackageSearch size={iconSize}/>} text='Products'/>
    <NavLink href='/recipes' icon={<CookingPot size={iconSize}/>} text='Recipes'/>
    <NavLink href='/profile' icon={<UserPen size={iconSize}/>} text='Profile'/>
  </div>
}
