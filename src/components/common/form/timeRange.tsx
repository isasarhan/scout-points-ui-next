import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { TimeRangePicker } from '@/components/ui/time-range-picker';
export interface FormTimeRangeProps {
    control: Control<any>
    name: string
    title: string
}
const FormTimeRange: FC<FormTimeRangeProps> = ({ control, name, title }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1 ">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <TimeRangePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default FormTimeRange;