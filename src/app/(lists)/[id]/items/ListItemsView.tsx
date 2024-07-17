'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/HeaderActionBar";
import { ShoppingList, ShoppingListProduct } from "@prisma/client";
import { useState, useMemo, useCallback } from "react";
import { ProductRow } from "@/app/products/_components/ProductRow";
import { useSelection } from "@/utils/useSelection";
import { shoppingListUpdateProductChecked } from "@/app/domain/shoppingList/shoppingListActions";

export const ShoppingListItemsView = ({ list }: { list: ShoppingList }) => {

  const [selectedProductIds, toggleSelect] = useSelection({
    initiallySelected: {
      items: list.products.filter(item => item.checked),
      getById: item => item.productId,
    },
    onChange: useCallback((id: string, selectedIds: Map<string, boolean>) => {
      setTimeout(() => {
        // Cannot update a component (`Router`) while rendering a different component (`ShoppingListItemsView`)
        shoppingListUpdateProductChecked(list.id, id, selectedIds.has(id));
      })
    }, [list.id])
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo<ShoppingListProduct[]>(() =>
      list.products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(product => ({
          ...product,
          checked: selectedProductIds.has(product.productId),
        })),
    [list.products, selectedProductIds, searchTerm]
  );

  return (<>
    <Header
      title={list.name}
      left={{ icon: 'arrowLeft', text: 'Lists', href: '/' }}
      right={{
        href: 'items/edit',
        text: list.products.length > 0 ? 'Edit' : undefined,
        icon: list.products.length === 0 ? 'plus' : undefined,
      }}
    >
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filtered.length === 0 && <p className='text-center mt-6'>No items</p>}
      {filtered.map(product => (
        <ProductRow
          key={product.productId}
          id={product.productId}
          {...product}
          selected={product.checked}
          onClick={toggleSelect}
        />
      ))}
    </ViewContent>
  </>);
}
