'use client'
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterBarProps, FilterBar, filterIcon } from "@/components/composite/FilterBar";

interface SelectProps {
  selectedCount: number;
  totalCount: number;
}

export interface HeaderActionBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  select?: SelectProps;
  filter?: FilterBarProps;
}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const { searchTerm, onSearchTermChange, select, filter } = props;

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

      {filter && <Button variant="outline" size="icon" onClick={handleToggleShowFilter}>
        {filterIcon[filter.filterType]}
      </Button>}
    </div>
    {filter && showFilterBar && <FilterBar {...filter}/>}
  </div>

}
