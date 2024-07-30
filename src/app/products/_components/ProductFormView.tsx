'use client';

import { Header } from "@/components/composite/Header";
import { useRef, useTransition, MouseEvent, useState } from "react";
import { ViewContent } from "@/components/composite/ViewContent";
import { Product } from "@/db/schema";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/components/composite/DeleteComfirmationDialog";
import { cn } from "@/lib/tailwindUtils";
import { addProduct, updateProduct, deleteProduct } from "@/domain/products/productActions";

export interface ShoppingListFormViewProps {
  product?: Product | null;
}

const parentUrl = '/products';
export const ProductFormView = ({ product }: ShoppingListFormViewProps) => {

  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );

  const handleSave = () => {
    formRef.current?.requestSubmit()
  }

  const handleAction = (formData: FormData) => {
    startTransition(() => action(formData));
  }

  const handleDeleteOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteDialogOpen(true);
  }

  const handleDelete = () => {
    if (!product) return;
    startDeleteTransition(() => deleteProduct(product.id));
  }

  return (<>
    <Header
      title='Lists'
      left={{ text: 'Cancel', href: parentUrl }}
      right={{ text: !isPending ? 'Save' : 'Save...', disabled: isPending || isDeletePending, onClick: handleSave }}
    />
    <ViewContent>
      <form className='space-y-8' action={handleAction} ref={formRef}>
        <div className='space-y-2'>
          <Label htmlFor="productName">Name</Label>
          <Input id="productName" type="text" name="name" autoFocus required defaultValue={product?.name || ""}/>
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>

        <div className='space-y-2'>
          <Label htmlFor="productName">Unit</Label>
          <Input id="productName" type="text" name="unit" required defaultValue={product?.unit || "kg"}/>
          {error.unit && <div className="text-destructive">{error.unit}</div>}
        </div>

        <Button type="submit" className='hidden'>NotVisible</Button> {/* Default action on enter*/}

        {product && <div className='space-y-2'>
          <Label htmlFor="productDelete">Delete</Label>
          <Button
            className={cn('block w-full', buttonVariants({ variant: "destructive" }))}
            onClick={handleDeleteOpen}
            disabled={isDeletePending}
          >{!isDeletePending ? 'Delete' : 'Delete...'}</Button>
        </div>}

      </form>
    </ViewContent>

    <DeleteConfirmationDialog
      open={isDeleteDialogOpen}
      onClose={() => setDeleteDialogOpen(false)}
      onConfirm={handleDelete}
    />
  </>);
}
