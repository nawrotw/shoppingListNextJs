import { Button } from "@/components/ui/button";
import { MenuIcon, X, CheckIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export interface SortButtonProps {
  pending: boolean;
  open: boolean;
  onStart: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SortButton = (props: SortButtonProps) => {

  const { pending, open, onStart, onConfirm, onCancel } = props;

  if (!open) {
    return <Button variant="outline" size="icon" onClick={onStart}>
      <MenuIcon/>
    </Button>
  }
  // we have save/cancel here
  return (
    <div className='flex border-l ml-4 pl-4'>
      <Button variant="outline" size="icon" onClick={onCancel} disabled={pending}>
        <X/>
      </Button>
      <Button variant="outline" size="icon" onClick={onConfirm} className='ml-1' disabled={pending}>
        {pending && <Spinner className='w-6' size='small'/>}
        {!pending && <CheckIcon className='w-6'/>}
      </Button>
    </div>
  )
}
