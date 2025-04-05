import { Search } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Input } from '../ui/input';
export interface SearchInputProps {}
const SearchInput: FC<SearchInputProps> = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
        </div>
    );
};

export default SearchInput;