'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/composite/HeaderActionBar";
import { useState, useMemo, useTransition, useCallback } from "react";
import { ProductRow } from "@/app/products/_components/ProductRow";
import { useSelection } from "@/utils/useSelection";
import { shoppingListUpdateProductChecked } from "@/domain/shoppingList/shoppingListActions";
import { sort } from "fast-sort";
import { ShoppingList, ShoppingListProduct } from "@/db/schema";
import { FilterType, filterMap } from "@/components/composite/FilterBar";
import { usePendingIds } from "@/infrastructure/hooks/usePendingIds";

export const ShoppingListItemsView = ({ list }: { list: ShoppingList }) => {

  const listProducts = useMemo(() =>
      sort(list.products || []).asc([p => p.checked, p => p.name])
    , [list]);

  const [selectedProductIds, toggleSelect] = useSelection({
    initiallySelected: {
      items: listProducts.filter(item => item.checked),
      getById: listProduct => listProduct.id,
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('ALL');


  const filtered = useMemo<ShoppingListProduct[]>(() =>
      listProducts
        .filter(product => filterMap[filterType](product.checked))
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(product => ({
          ...product,
          checked: selectedProductIds.has(product.id),
        })),
    [listProducts, selectedProductIds, searchTerm, filterType]
  );

  const [, startToggleTransition] = useTransition();

  const { isPending, addId, removeId } = usePendingIds();

  const handleItemClick = useCallback((id: number, selected: boolean) => {
    addId(id);
    toggleSelect(id, selected);
    startToggleTransition(async () => {
      await shoppingListUpdateProductChecked(list.id, id, !selected);
      removeId(id);
    });
  }, [addId, list.id, removeId, toggleSelect]);

  const itemsLeftCount = useMemo(() => {
    if (!listProducts) return -1;
    return listProducts.reduce((count, todo) => todo.checked ? count : count + 1, 0);
  }, [listProducts]);


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
        filter={{ filterType, onFilterChange: setFilterType, itemsLeftCount }}
      />
    </Header>
    <ViewContent>
      {filtered.length === 0 && <p className='text-center mt-6'>No items</p>}
      {filtered.map(product => (
        <ProductRow
          key={product.id}
          {...product}
          selected={product.checked}
          pending={isPending(product.id)}
          onClick={handleItemClick}
        />
      ))}
    </ViewContent>
  </>);
}
