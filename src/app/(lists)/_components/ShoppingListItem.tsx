import { ShoppingList } from "@prisma/client";
import { ReactNode } from "react";

export interface ListItemProps {
  item: ShoppingList;
  actions?: ReactNode;
}

export const ShoppingListItem = (props: ListItemProps) => {
  const {item, actions} = props;

  return <div className='-mx-4 px-4 py-2 border-b flex items-center'>
    <div>
      <div className='text-xl'>{item.name}</div>
      <div className='text-sm text-muted-foreground'>Products: {item.products.length}</div>
    </div>
    <div className='flex flex-1 justify-end'>
      {actions}
    </div>
  </div>

}
