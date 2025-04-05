"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { FC } from 'react';
import { UseFormRegisterReturn } from "react-hook-form"
export interface DatePickerProps {
    value?: string;
    onChange?: (value: string) => void;
    register?: UseFormRegisterReturn;
}
const DatePicker: FC<DatePickerProps> = ({ value, onChange, register, }) => {
    const [date, setDate] = React.useState<Date>()


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "flex w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(v) => {
                        if(v){
                            setDate(v)
                            onChange?.(v.toDateString())
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
            {register && <input type="hidden" {...register} value={date?.toDateString()} />}
        </Popover>
    )
};

export default DatePicker;