'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/composite/HeaderActionBar";
import { Product, ShoppingList } from "@/db/schema";
import { useState, useTransition, useMemo } from "react";
import { ProductRow, ProductListItemActions } from "@/app/products/_components/ProductRow";
import { useRouter } from "next/navigation";
import { shoppingListUpdateProducts } from "@/domain/shoppingList/shoppingListActions";
import { useSelection } from "@/utils/useSelection";

interface SelectableProduct extends Product {
  isSelected: boolean;
}

interface AddProductsViewProps {
  list: ShoppingList;
  products: Product[];
}

const actions: ProductListItemActions[] = [];

export const ShoppingListEditProductsView = ({ list, products }: AddProductsViewProps) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedProductIds, toggleSelect] = useSelection({
    initiallySelected: {
      items: list.products || [],
      getById: item => item.productId,
    },
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems: SelectableProduct[] = useMemo(() =>
      products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(product => ({
          ...product,
          isSelected: selectedProductIds.has(product.id),
        })),
    [products, selectedProductIds, searchTerm]
  );

  const handleSave = () => {
    startTransition(async () => {
      const selectedProducts = products.filter(product => selectedProductIds.has(product.id));
      await shoppingListUpdateProducts(list.id, selectedProducts);
    });
  }


  return (<>
    <Header
      title='Add/Remove Products'
      left={{ text: 'Cancel', onClick: () => router.back() }}
      right={{
        text: isPending ? 'Save...' : 'Save',
        disabled: isPending,
        onClick: handleSave
      }}
    >
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filteredItems.map((product) => {
        return (
          <ProductRow
            key={product.id}
            {...product}
            selected={product.isSelected}
            onClick={toggleSelect}
            actions={actions}
          />
        );
      })}
    </ViewContent>
  </>);
}
