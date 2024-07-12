import { LinkButton } from "@/components/LinkButton";
import { ChevronLeft } from "lucide-react";
import { CaptionCard } from "@/components/CaptionCard";
import { Button } from "@/components/ui/button";


export const LinkButtonsStory = () => {
  return (<div className='flex flex-col'>
    <CaptionCard title='LinkButton'>
      <Button>Button</Button>
    </CaptionCard>
    <CaptionCard title='LinkButton'>
      <LinkButton>LinkButton</LinkButton>
    </CaptionCard>
    <CaptionCard title='with icon'>
      <LinkButton className='inline-flex gap-1 items-center'><ChevronLeft/> LinkButton</LinkButton>
    </CaptionCard>
  </div>);
};
