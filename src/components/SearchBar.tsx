
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const SearchBar = ({ placeholder = "Search", onSearch }: SearchBarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <Input 
        type="text" 
        placeholder={placeholder}
        onChange={handleSearchChange}
        className="pl-10"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </div>
    </div>
  );
};

export default SearchBar;
