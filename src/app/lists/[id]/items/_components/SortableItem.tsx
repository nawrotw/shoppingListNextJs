import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MenuIcon } from "lucide-react";

export interface SortableItemProps {
  id: number;
  children?: ReactNode;
}

export const SortableItem = (props: SortableItemProps) => {

  const { children } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    transition: {
      duration: 150, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className='flex items-center' ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='flex-1 -mr-6'>{children}</div>
      <MenuIcon/>
    </div>
  );
}
