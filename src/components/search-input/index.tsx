import { Search } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Input } from '../ui/input';
export interface SearchInputProps {
    handleSearch(query: string): void
}

const SearchInput: FC<SearchInputProps> = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const onSearch = (query: string) => {
        setSearchTerm(query)
        handleSearch(query)
    }
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
            />
        </div>
    );
};

export default SearchInput;