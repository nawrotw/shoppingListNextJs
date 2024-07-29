'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/composite/HeaderActionBar";
import { useState, useMemo, useCallback } from "react";
import { ProductRow } from "@/app/products/_components/ProductRow";
import { useSelection } from "@/utils/useSelection";
import { shoppingListUpdateProductChecked } from "@/domain/shoppingList/shoppingListActions";
import { sort } from "fast-sort";
import { ShoppingList, ShoppingListProduct } from "@/db/schema";

export const ShoppingListItemsView = ({ list }: { list: ShoppingList }) => {

  const listProducts = useMemo(() =>
      sort(list.products || []).asc([p => p.checked, p => p.name])
    , [list]);

  const [selectedProductIds, toggleSelect] = useSelection({
    initiallySelected: {
      items: listProducts.filter(item => item.checked),
      getById: listProduct => listProduct.id,
    },
    onChange: useCallback((listProductId: number, selectedIds: Map<number, boolean>) => {
      setTimeout(() => {
        // Cannot update a component (`Router`) while rendering a different component (`ShoppingListItemsView`)
        shoppingListUpdateProductChecked(list.id, listProductId, selectedIds.has(listProductId));
      })
    }, [list.id])
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo<ShoppingListProduct[]>(() =>
      listProducts
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(product => ({
          ...product,
          checked: selectedProductIds.has(product.id),
        })),
    [listProducts, selectedProductIds, searchTerm]
  );

  return (<>
    <Header
      title={list.name}
      left={{ icon: 'arrowLeft', text: 'Lists', href: '/lists' }}
      right={{
        href: 'items/edit',
        text: listProducts.length > 0 ? 'Edit' : undefined,
        icon: listProducts.length === 0 ? 'plus' : undefined,
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
          key={product.id}
          {...product}
          selected={product.checked}
          onClick={toggleSelect}
        />
      ))}
    </ViewContent>
  </>);
}
