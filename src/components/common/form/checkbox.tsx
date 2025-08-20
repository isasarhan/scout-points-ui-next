import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import { Control } from 'react-hook-form';

interface Item {
    value: any
    label: string
}
interface FormCheckboxProps {
    control: Control<any>
    name: string
    title?: string
    placeholder?: string
    item: Item
    defaultValue?: boolean
    items?: Item[]
    className?: string
}
const FormCheckbox: FC<FormCheckboxProps> = ({
    item,
    control,
    name,
    className,
    title,
    placeholder,
    defaultValue,
    ...props
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const { value = [] } = field;

                const isChecked = value?.includes(item.value) ;

                return (
                    <FormItem className={cn(className, "flex items-center gap-3")}>
                        <FormControl className='flex justify-center'>
                            <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                        ? [...value, item.value]
                                        : value.filter((v: any) => v !== item.value);
                                    field.onChange(newValue);
                                }}
                            />
                        </FormControl>
                        <FormLabel >
                            {item.label}
                        </FormLabel>
                    </FormItem>
                );
            }}
        />
    );
};


export default FormCheckbox;
