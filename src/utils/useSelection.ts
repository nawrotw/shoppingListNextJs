import { useState, useCallback } from "react";

interface InitiallySelected<T, Id> {
  items: Array<T>;
  getById: (item: T) => Id;
}

export interface UseSelectionProps<T, Id> {
  initiallySelected: InitiallySelected<T, Id>;
  onChange?: (id: Id, selectedIds: Map<Id, boolean>) => void;
}

type RetType<Id> = [Map<Id, boolean>, (id: Id) => void];

export const useSelection = <T, Id>(props: UseSelectionProps<T, Id>): RetType<Id> => {

  const { initiallySelected, onChange } = props;

  const [selectedIds, setSelectedIds] = useState<Map<Id, boolean>>(initiallySelected.items
    .reduce((acc: Map<Id, boolean>, item: T) => {
      acc.set(initiallySelected.getById(item), true);
      return acc;
    }, new Map())
  );

  const toggleSelect = useCallback(
    (id: Id) => {
      setSelectedIds(ids => {
        // this will be fired 2x in Strict mode
        const selectedIds = new Map(ids); // shallow copy
        if (selectedIds.has(id)) {
          selectedIds.delete(id);
        } else {
          selectedIds.set(id, true);
        }
        onChange?.(id, selectedIds);
        return selectedIds;
      });
    },
    [onChange]
  );


  return [
    selectedIds,
    toggleSelect,
  ];
}
