'use client'
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface SelectProps {
  selectedCount: number;
  totalCount: number;
}
export interface HeaderActionBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  select?: SelectProps;
}

export const HeaderActionBar = (props: HeaderActionBarProps) => {
  const { searchTerm, onSearchTermChange, select } = props;

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.currentTarget.value);
  }

  return <div className='p-2 flex'>
    <Input value={searchTerm} onChange={handleSearchTermChange}/>
    {select &&
      <div>{select.selectedCount}/{select.totalCount}</div>
    }
  </div>

}
