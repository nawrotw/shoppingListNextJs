'use client'
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterBarProps, FilterBar, filterIcon } from "@/components/composite/FilterBar";
import { SortProps } from "@/app/lists/[id]/items/_components/SortableListItems";
import { SortButton } from "@/components/composite/header/sortButton/SortButton";

interface SelectProps {
  selectedCount: number;
  totalCount: number;
}

export interface HeaderActionBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  select?: SelectProps;
  filter?: FilterBarProps;
  sort?: SortProps;
}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const {
    searchTerm,
    onSearchTermChange,
    select, filter,
    sort,
  } = props;

  const [showFilterBar, setShowFilterBar] = useState(false);

  const handleToggleShowFilter = () => {
    setShowFilterBar(!showFilterBar);
  }

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.currentTarget.value);
  }

  return <div>
    <div className='p-2 flex items-center gap-1'>
      <Input value={searchTerm} onChange={handleSearchTermChange}/>
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
