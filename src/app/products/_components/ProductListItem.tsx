import { Product } from "@prisma/client";
import Link from "next/link";

export interface ProductListItem {
  product: Product;
  href: string;
}

export const ProductListItem = (props: ProductListItem) => {

  const { product, href } = props

  return <Link href={href} className='-mx-4 px-4 py-2 border-b flex items-center'>
    <div className='truncate hover:text-clip'>{product.name}</div>
    <div className='ml-2 text-sm text-muted-foreground whitespace-nowrap w-8'>[{product.unit}]</div>
  </Link>

}
