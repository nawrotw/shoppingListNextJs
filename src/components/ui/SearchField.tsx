import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef } from "react";
import { SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/tailwindUtils";

export interface SearchFieldProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
}

export const SearchField = ({ searchTerm, onSearchTermChange, className }: SearchFieldProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.currentTarget.value);
  }

  const handleClear = () => {
    onSearchTermChange('');
    inputRef.current?.focus();
  }

  return <div className={cn('relative', className)}>
    <SearchIcon className='absolute top-1/2 -translate-y-1/2 ml-1'/>
    <X
      onClick={handleClear}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer transition-opacity',
        searchTerm.length === 0 ? 'opacity-0' : 'opacity-100')}
    />
    <Input
      ref={inputRef}
      value={searchTerm}
      onChange={handleSearchTermChange}
      className='pl-8 pr-8'
    />
  </div>
}
