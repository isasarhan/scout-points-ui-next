import React, { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
export interface DropdownProps {
    options: any[];
    handleDropdownChange(value: string): void
}
const Dropdown: FC<DropdownProps> = ({ options, handleDropdownChange }) => {
    const [value, setValue] = useState('')
    const handleChange = (value: string) => {
        handleDropdownChange(value)
        setValue(value)
    }
    return (
        <>
            <Select value={value} onValueChange={handleChange}>
                <SelectTrigger className="min-w-40">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {options.map(option => (
                        <SelectItem key={option._id} value={option._id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default Dropdown;