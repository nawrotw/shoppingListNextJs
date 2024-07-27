'use client' // why? maybe Node15 will have better error messages

import { Header } from "@/components/composite/Header";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/LinkButton";
import { ViewContent } from "@/components/composite/ViewContent";
import { CaptionCard } from "@/components/CaptionCard";
import { ThemePicker } from "@/components/ThemePicker";
import { initDb } from "@/db/initDb";
import { useTransition } from "react";

export default function ProfilePage() {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      initDb();
    });
  }

  return (<>
    <Header title='Profile'></Header>
    <ViewContent>
      <ThemePicker className='absolute right-1 top-1'/>
      <Button
        variant='outline'
        onClick={handleClick}
        disabled={isPending}>
        {isPending ? 'Init DB...' : 'Init DB'}
      </Button>
      <CaptionCard title='Typography' className='block my-2'>
        <h5>Typography:</h5>
        <h1>h1 - Header h1</h1>
        <h2>h2 - Header h2</h2>
        <h3>h3 - Header h2</h3>
        <h4>h4 - Header h2</h4>
        <h5>h5 - Header h2</h5>
        <p>Base typography</p>
        <p className="text-sm">small</p>
        <p className="text-sm text-muted-foreground">small, muted</p>
        <p className="text-sm text-primary-foreground">small, muted</p>
      </CaptionCard>
      <Button variant='link'>I&apos;m a Button</Button>
      <LinkButton href='/'>LinkButton</LinkButton>
    </ViewContent>
  </>);
}
