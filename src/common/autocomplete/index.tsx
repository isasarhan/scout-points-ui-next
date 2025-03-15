"use client";

import React, { FC } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options: Option[];
  placeholder?: string;
  value?: string; 
  onChange?: (value: string) => void; 
  register?: UseFormRegisterReturn;
}

const Autocomplete: FC<AutocompleteProps> = ({
  options,
  placeholder,
  value,
  onChange,
  register,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder || "Select Option..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange?.(option.value)
                    setOpen(false);
                  }}>
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {register && <input type="hidden" {...register} value={value} />}
    </Popover>
  );
};

export default Autocomplete;
