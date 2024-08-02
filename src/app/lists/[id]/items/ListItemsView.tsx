'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/composite/HeaderActionBar";
import { useState, useMemo, useTransition, useCallback, useEffect } from "react";
import { ProductRow } from "@/app/products/_components/ProductRow";
import { useSelection } from "@/utils/useSelection";
import { shoppingListUpdateProductChecked, shoppingListProductsResetDone, shoppingListProductsUpdateOrder } from "@/domain/shoppingList/shoppingListActions";
import { ShoppingList, ShoppingListProduct } from "@/db/schema";
import { FilterType, filterMap } from "@/components/composite/FilterBar";
import { usePendingIds } from "@/infrastructure/hooks/usePendingIds";

import { SortableListItems } from "@/app/lists/[id]/items/_components/SortableListItems";
import { arraysEqualShallow } from "@/utils/arrayUtils";

export const ShoppingListItemsView = ({ list }: { list: ShoppingList }) => {

  const listProducts = useMemo(() => list.products || [], [list]);

  const [selectedProductIds, toggleSelect, resetSelected] = useSelection({
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


  const [isResetPending, startResetTransition] = useTransition();
  const handleResetDone = () => {
    startResetTransition(async () => {
      await shoppingListProductsResetDone(list.id);
      resetSelected(); // this should not be needed, but somehow next.js refuse to refresh
    });
  }

  const [isSort, setIsSort] = useState(false);
  const [isSortPending, startSortTransition] = useTransition();
  const [orderedItems, setOrderedItems] = useState(filtered);

  useEffect(() => {
    setOrderedItems(filtered);
  }, [filtered]);

  const handleSortCancel = () => {
    setIsSort(false);
    setOrderedItems(filtered);
  }
  const handleSortSave = () => {
    startSortTransition(async () => {
      // TODO wkn we could write here some logic to detect only changes
      const oldOrder = filtered.map(({ id }) => id);
      const newOrder = orderedItems.map(({ id }) => id);
      if (!arraysEqualShallow(oldOrder, newOrder)) {
        await shoppingListProductsUpdateOrder(list.id, newOrder);
      }
      setIsSort(false);
    });
  }

  const renderProductRow = (product: ShoppingListProduct) => {
    return <ProductRow
      key={product.id}
      {...product}
      selected={product.checked}
      pending={isPending(product.id)}
      onClick={handleItemClick}
    />
  }

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
        filter={{
          itemsLeftCount,
          filterType,
          onFilterChange: setFilterType,
          isResetPending: isResetPending,
          onResetDone: handleResetDone
        }}
        sort={{
          pending: isSortPending,
          open: isSort,
          onStart: () => setIsSort(true),
          onConfirm: handleSortSave,
          onCancel: handleSortCancel
        }}
      />
    </Header>
    <ViewContent>
      {orderedItems.length === 0 && <p className='text-center mt-6'>No items</p>}
      {isSort && <SortableListItems
        items={orderedItems}
        onReorder={setOrderedItems}
        render={product => renderProductRow(product)}
      />}
      {!isSort && orderedItems.map(product => renderProductRow(product))}
    </ViewContent>
  </>);
}
