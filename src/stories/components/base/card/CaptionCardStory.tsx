import { CaptionCard } from "@/components/CaptionCard";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/LinkButton";
import { ChevronLeft } from "lucide-react";

export const CaptionCardStory = () => {
  return (<div>

    <CaptionCard title='LinkButton'>
      <LinkButton>LinkButton</LinkButton>
    </CaptionCard>
    <CaptionCard title='LinkButton'>
      <Button>Button</Button>
    </CaptionCard>
    <br/>
    <CaptionCard title='LinkButton'>
      <p className='bg-secondary'>Simple text</p>
    </CaptionCard>
    <br/>

    <CaptionCard title='with icon'>
      <LinkButton className='inline-flex gap-1 items-center'><ChevronLeft/> LinkButton</LinkButton>
    </CaptionCard>

  </div>);
};
