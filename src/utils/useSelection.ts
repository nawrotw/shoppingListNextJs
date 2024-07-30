import { useState, useCallback } from "react";

interface InitiallySelected<T, Id> {
  items: Array<T>;
  getById: (item: T) => Id;
}

export interface UseSelectionProps<T, Id> {
  initiallySelected: InitiallySelected<T, Id>;
}

type RetType<Id> = [Map<Id, boolean>, (id: Id, selected: boolean) => void];

export const useSelection = <T, Id>(props: UseSelectionProps<T, Id>): RetType<Id> => {

  const { initiallySelected } = props;

  const [selectedIds, setSelectedIds] = useState<Map<Id, boolean>>(initiallySelected.items
    .reduce((acc: Map<Id, boolean>, item: T) => {
      acc.set(initiallySelected.getById(item), true);
      return acc;
    }, new Map())
  );

  const toggleSelect = useCallback(
    (id: Id, selected: boolean) => {
      setSelectedIds(ids => {
        // this will be fired 2x in Strict mode
        const selectedIds = new Map(ids); // shallow copy
        if (selected) {
          selectedIds.delete(id);
        } else {
          selectedIds.set(id, true);
        }
        return selectedIds;
      });
    },
    []
  );


  return [
    selectedIds,
    toggleSelect,
  ];
}
