'use client';

import { Header } from "@/components/composite/Header";
import { useRef, useTransition, MouseEvent } from "react";
import { ViewContent } from "@/components/composite/ViewContent";
import { ShoppingList } from "@prisma/client";
import { useFormState } from "react-dom";
import { createShoppingList, updateShoppingList, deleteShoppingList } from "@/app/(lists)/_actions/shoppingListActions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ShoppingListFormViewProps {
  list?: ShoppingList | null;
}

export const ShoppingListFormView = ({ list }: ShoppingListFormViewProps) => {

  const [error, action] = useFormState(
    list == null ? createShoppingList : updateShoppingList.bind(null, list.id),
    {}
  );

  // const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const router = useRouter();

  const handleSave = () => {
    formRef.current?.requestSubmit()
  }

  const handleAction = (formData: FormData) => {
    console.log('handleAction')
    startTransition(async () => {
      action(formData);
    });

  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!list) return;
    e.preventDefault();
    startDeleteTransition(async () => {
      await deleteShoppingList(list.id);
      router.push('/')
    });
  }

  return (<>
    <Header
      title='Lists'
      left={{ text: 'Cancel', href: '/' }}
      right={{ text: !isPending ? 'Save' : 'Save...', disabled: isPending || isDeletePending, onClick: handleSave }}
    />
    <ViewContent>
      <form className='space-y-8' action={handleAction} ref={formRef}>
        <div className='space-y-2'>
          <Label htmlFor="productName">Name</Label>
          <Input id="productName" type="text" name="name" autoFocus required defaultValue={list?.name || ""}/>
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>

        <Button type="submit" className='hidden'>NotVisible</Button> {/* Default action on enter*/}

        {list && <div className='space-y-2'>
          <Label htmlFor="productDelete">Delete</Label>
          <Button
            className='block w-full bg-destructive text-destructive-foreground'
            onClick={handleDelete}
            disabled={isDeletePending}
          >{!isDeletePending ? 'Delete' : 'Delete...'}</Button>
        </div>}

      </form>
    </ViewContent>
  </>);
}
