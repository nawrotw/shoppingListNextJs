import { Button } from "@/components/ui/button";
import { ThemePicker } from "@/components/ThemePicker";
import { LinkButton } from "@/components/LinkButton";

export default function Home() {

  return (
    <main className="p-4">
      <ThemePicker/>
      <div className='p-4'>
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

      </div>
      <Button variant='outline'>I&apos;m a Button</Button>
      <Button variant='link'>I&apos;m a Button</Button>
      <LinkButton>LinkButton</LinkButton>

    </main>
  );
}
