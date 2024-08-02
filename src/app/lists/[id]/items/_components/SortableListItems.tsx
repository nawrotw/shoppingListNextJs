import { DndContext, closestCenter, useSensors, useSensor, PointerSensor, KeyboardSensor, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "@/app/lists/[id]/items/_components/SortableItem";
import { ReactNode } from "react";
import { ShoppingListProduct } from "@/db/schema";

export interface SortableListItemsProps {
  items: ShoppingListProduct[];
  onReorder: (items: ShoppingListProduct[]) => void;
  render: (item: ShoppingListProduct) => ReactNode
}

export const SortableListItems = (props: SortableListItemsProps) => {

  const { items, render, onReorder } = props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      // TODO wkn for bigger lists potential performance gain might come with using
      // orderMap: {id, order} => orderMap.get(id) vs Array.find(...)
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(product => (
          <SortableItem id={product.id} key={product.id}>
            {render(product)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}
