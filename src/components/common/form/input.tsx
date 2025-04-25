import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

export interface FormInputProps extends React.ComponentProps<"input">{
    control: Control<any>
    name: string
    title?: string
    placeholder: string
}

const FormInput: FC<FormInputProps> = ({ control, name, title, placeholder, ...props  }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Input {...props} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;