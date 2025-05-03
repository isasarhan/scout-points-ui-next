import React, { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
export interface DropdownProps {
    placeholder:string
    options: { label: string, value: string, key: string }[];
    handleDropdownChange(value: string): void
}
const Dropdown: FC<DropdownProps> = ({ options, handleDropdownChange, placeholder }) => {
    const [value, setValue] = useState('')
    const handleChange = (value: string) => {
        handleDropdownChange(value)
        setValue(value)
    }
    return (
        <>
            <Select value={value} onValueChange={handleChange}>
                <SelectTrigger className="min-w-40">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {options.map(option => (
                        <SelectItem key={option.key} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default Dropdown;