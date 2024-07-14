"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { ShoppingList } from "@prisma/client";
import { createShoppingList, updateShoppingList } from "@/app/(lists)/_actions/shoppingListActions";
import { useEffect, RefObject } from "react";

interface ListFormProps {
  list?: ShoppingList | null;
  formRef: RefObject<HTMLFormElement>;
  onPending: (pending: boolean) => void;
}

export const ShoppingListForm = ({ list, onPending, formRef }: ListFormProps) => {

  const [error, action] = useFormState(
    list == null ? createShoppingList : updateShoppingList.bind(null, list.id),
    {}
  )

  return <form className='space-y-8' action={action} ref={formRef}>
    <div className='space-y-2'>
      <Label htmlFor="productName">Name</Label>
      <Input id="productName" type="text" name="name" autoFocus required defaultValue={list?.name || ""}/>
      {error.name && <div className="text-destructive">{error.name}</div>}
    </div>

    <SubmitButton onPending={onPending}/>
  </form>
}

function SubmitButton({onPending}: {onPending: (pending: boolean) => void}) {
  const { pending } = useFormStatus();
  useEffect(() => {
    onPending(pending);
  }, [pending])

  return (
    <Button type="submit" disabled={pending} className='hidden'>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
