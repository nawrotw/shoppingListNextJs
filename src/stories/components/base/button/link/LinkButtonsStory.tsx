import { LinkButton } from "@/components/LinkButton";
import { ChevronLeft } from "lucide-react";
import { CaptionCard } from "@/components/CaptionCard";
import { Button } from "@/components/ui/button";


export const LinkButtonsStory = () => {
  return (<div className='flex'>
    <Button>Button</Button>
    <LinkButton>LinkButton</LinkButton>
    <LinkButton className='inline-flex gap-1 items-center'><ChevronLeft/> LinkButton</LinkButton>
    <LinkButton className='inline-flex gap-1 items-center' disabled><ChevronLeft/> LinkButton</LinkButton>
  </div>);
};
