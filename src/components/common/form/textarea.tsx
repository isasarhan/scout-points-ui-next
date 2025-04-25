import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';
export interface FormTextAreaProps {
    control: Control<any>
    name: string
    title: string
    placeholder: string
}
const FormTextArea: FC<FormTextAreaProps> = ({ control, name, title, placeholder }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Textarea rows={3} placeholder="Enter description (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormTextArea;