import { Product } from "@prisma/client";
import Link from "next/link";
import { memo, ReactNode, Fragment } from "react";
import { AlignJustifyIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";

export type ProductListItemActions = 'reorder';

const actionsMap: Record<ProductListItemActions, ReactNode> = {
  'reorder': <AlignJustifyIcon className='my-2'/>
}

// "extends Product" will pass props of the Product instead of Product instance, which helps with memo
export interface ProductListItem extends Product {
  href?: string;
  selected?: boolean;
  onClick?: (productId: string) => void;
  actions?: ProductListItemActions[];
}

export const ProductRow = memo((props: ProductListItem) => {
  const { id, name, unit, href, selected, onClick, actions } = props

  // console.log('render', name); // performance check
  const handleClick = () => {
    onClick?.(id)
  }

  return <Link
    href={href || ''}
    onClick={handleClick}
    className='-mx-4 px-4 h-16 border-b flex items-center'
  >
    <div className='flex items-center'>
      {selected !== undefined && <Checkbox checked={selected} className='mr-2'/>}
      <div className='truncate hover:text-clip'>{name}</div>
      <div className='ml-2 text-sm text-muted-foreground whitespace-nowrap w-8'>[{unit}]</div>
    </div>
    <div className='flex flex-1 justify-end'>
      {actions?.map(action =>
        <Fragment key={action}>
          {actionsMap[action]}
        </Fragment>)}
    </div>
  </Link>
});

ProductRow.displayName = 'ProductRow';
