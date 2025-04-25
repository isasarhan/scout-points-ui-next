import DatePicker from '@/components/datepicker';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

export interface FormDatePickerProps {
    control: Control<any>
    name: string
    title: string
}

const FormDatePicker: FC<FormDatePickerProps> = ({ control, name, title }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormDatePicker;