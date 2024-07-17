import ListIcon from "@/icons/ListIcon";
import { NotebookTabs, PackageSearch, CookingPot, UserPen } from "lucide-react";

const iconSize = 96;
export const IconsStory = () => {
  return (<div className='flex [&>*]:border'>
    <ListIcon size={iconSize}/>
    <NotebookTabs size={iconSize}/>
    <PackageSearch size={iconSize}/>
    <CookingPot size={iconSize}/>
    <UserPen size={iconSize}/>
  </div>);
};
