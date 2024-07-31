import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import FilterNotCheckedIcon from "@/icons/filters/FilterNotCheckedIcon";
import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/tailwindUtils";
import FilterCheckedIcon from "@/icons/filters/FilterCheckedIcon";
import FilterIcon from "@/icons/filters/FilterIcon";
import { Spinner } from "@/components/ui/spinner";

export type FilterType = 'ALL' | 'TO_BUY' | 'ALREADY_BOUGHT';
export const filterMap: Record<FilterType, (checked: boolean) => boolean> = {
  ALL: () => true,
  TO_BUY: (checked) => !checked,
  ALREADY_BOUGHT: (checked) => checked,
}

export const filterIcon: Record<FilterType, ReactNode> = {
  ALL: <FilterIcon/>,
  TO_BUY: <FilterNotCheckedIcon/>,
  ALREADY_BOUGHT: <FilterCheckedIcon/>,
}

const getItemsLeftText = (count?: number) => {
  switch (count || 0) {
    case 0:
      return `No items left`;
    case 1:
      return `1 item left`;
  }
  return `${count} items left`;
}

export interface FilterBarProps {
  filterType: FilterType;
  itemsLeftCount: number;
  onFilterChange: (mode: FilterType) => void;
  isResetPending: boolean;
  onResetDone: () => void;
}

export const FilterBar = (props: FilterBarProps) => {

  const { itemsLeftCount, filterType, onFilterChange, isResetPending, onResetDone } = props;

  return <div className='p-2 flex items-center gap-1'>
    <Button variant='outline' size='icon' onClick={onResetDone} disabled={isResetPending}>
      {isResetPending && <Spinner className='w-6' size='small'/>}
      {!isResetPending && <TrashIcon/>}
    </Button>
    <SelectedButton isSelected={filterType === 'ALL'} onClick={() => onFilterChange?.('ALL')}>
      <FilterIcon/> All
    </SelectedButton>
    <SelectedButton isSelected={filterType === 'TO_BUY'} onClick={() => onFilterChange?.('TO_BUY')}>
      <FilterNotCheckedIcon/> To buy
    </SelectedButton>
    <SelectedButton isSelected={filterType === 'ALREADY_BOUGHT'} onClick={() => onFilterChange?.('ALREADY_BOUGHT')}>
      <FilterCheckedIcon/> Already bought
    </SelectedButton>
    <div className='whitespace-nowrap p-2'>{getItemsLeftText(itemsLeftCount)}</div>
  </div>
}

type SelectedButtonProps = ComponentProps<typeof Button> & { children: ReactNode, isSelected: boolean };

function SelectedButton(props: SelectedButtonProps) {
  const { children, isSelected, ...restProps } = props;
  return <Button variant="outline" {...restProps} className={cn(isSelected && 'outline')}>
    {children}
  </Button>
}
