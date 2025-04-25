import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { MultiSelect } from '@/components/ui/multi-select';

export interface FormMultiSelectProps {
    control: Control<any>
    name: string
    title: string
    placeholder: string
    options:any[]
}

const FormMultiSelect: FC<FormMultiSelectProps> = ({ control, name, title, placeholder ,options}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <MultiSelect
                            options={options}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder={placeholder}
                        />

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormMultiSelect;