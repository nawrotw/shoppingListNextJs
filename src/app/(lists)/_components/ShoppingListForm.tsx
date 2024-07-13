"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { ShoppingList } from "@prisma/client";
import { createShoppingList, updateShoppingList } from "@/app/(lists)/_actions/shoppingListActions";

interface ListFormProps {
  list?: ShoppingList | null
}

export const ShoppingListForm = ({ list }: ListFormProps) => {

  const [error, action] = useFormState(
    list == null ? createShoppingList : updateShoppingList.bind(null, list.id),
    {}
  )

  const handleSubmit = (payload: FormData) => {
    action(payload);
  }

  return <form className='space-y-8' action={handleSubmit}>
    <div className='space-y-2'>
      <Label htmlFor="productName">Name</Label>
      <Input id="productName" type="text" name="name" required defaultValue={list?.name || ""}/>
      {error.name && <div className="text-destructive">{error.name}</div>}
    </div>

    <SubmitButton/>
  </form>
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
