'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterBarProps, FilterBar, filterIcon } from "@/components/composite/FilterBar";
import { SortButton, SortButtonProps } from "@/components/composite/header/sortButton/SortButton";
import { SearchFieldProps, SearchField } from "@/components/ui/SearchField";

interface SelectProps {
  selectedCount: number;
  totalCount: number;
}

export interface HeaderActionBarProps {
  search: SearchFieldProps;
  select?: SelectProps;
  filter?: FilterBarProps;
  sort?: SortButtonProps;
}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const { select, filter, search, sort } = props;

  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleToggleShowFilter = () => {
    setShowFilterBar(!showFilterBar);
  }

  return <div>
    <div className='p-2 flex items-center gap-1'>
      {search && <SearchField className='flex-1' {...search}/>}
      {select &&
        <div>{select.selectedCount}/{select.totalCount}</div>
      }

      {filter && <Button variant="outline" size='icon' onClick={handleToggleShowFilter}>
        {filterIcon[filter.filterType]}
      </Button>}
      {sort && <SortButton {...sort}/>}
    </div>
    {filter && showFilterBar && <FilterBar {...filter}/>}
  </div>

}
