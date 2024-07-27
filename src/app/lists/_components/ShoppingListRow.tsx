import { ShoppingList } from "@/db/schema";
import { ReactNode } from "react";
import Link from "next/link";

export interface ListItemProps {
  item: ShoppingList;
  href: string;
  actions?: ReactNode;
}

export const ShoppingListRow = (props: ListItemProps) => {
  const { item, actions, href } = props;

  const toBuyCount = (item.products || []).filter(({ checked }) => !checked).length

  return <Link href={href} className='-mx-4 px-4 py-2 border-b flex items-center'>
    <div>
      <div className='text-xl'>{item.name}</div>
      <div className='text-sm text-muted-foreground'>Products: {item.products?.length}, to buy: {toBuyCount}</div>
    </div>
    <div className='flex flex-1 justify-end'>
      {actions}
    </div>
  </Link>

}
