import { NavLink } from "@/components/composite/navigation/NavLink";
import { cn } from "@/lib/tailwindUtils";
import { NotebookTabs, PackageSearch, CookingPot, UserPen } from "lucide-react";

export interface NavigationBarProps {
  className?: string;
}

const iconSize = 32;
export const NavigationBar = ({ className }: NavigationBarProps) => {

  return <div className={cn('flex items-center', className)}>
    <NavLink href='/' icon={<NotebookTabs size={iconSize}/>} text='Lists'/>
    <NavLink href='/products' icon={<PackageSearch size={iconSize}/>} text='Products'/>
    <NavLink href='/recipes' icon={<CookingPot size={iconSize}/>} text='Recipes'/>
    <NavLink href='/profile' icon={<UserPen size={iconSize}/>} text='Profile'/>
  </div>
}
