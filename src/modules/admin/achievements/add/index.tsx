'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod'
import { AddAchievementSchema } from '../validation';
import DatePicker from '@/components/datepicker';
import { Textarea } from '@/components/ui/textarea';
import Autocomplete from '@/components/autocomplete';
import { IDepartment } from '@/types/department';
import { Button } from '@/components/ui/button';
import { IAchievemntCategory } from '@/types/achievemntCategory';
import { MultiSelect } from '@/components/ui/multi-select';
import { useUserContext } from '@/providers/UserProvider';
import useAchievements from '@/services/achievements';
import { toast } from 'sonner';
import { Level } from '@/types/achievement';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Delete, DeleteIcon, X } from 'lucide-react';
import FormInput from '@/components/common/form/input';
import FormDatePicker from '@/components/common/form/datePicker';
import FormMultiSelect from '@/components/common/form/multiSelect';
import FormSelect from '@/components/common/form/select';
import FormTextArea from '@/components/common/form/textarea';

export interface AddAchievementModuleProps {
    departments: IDepartment[]
    categories: IAchievemntCategory[]
}

const AddAchievementModule: FC<AddAchievementModuleProps> = ({ departments, categories }) => {
    const { token } = useUserContext();
    const { add } = useAchievements({ token })
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddAchievementSchema),
        defaultValues: {
            categories: [],
            departments: [],
            requirements: [{ value: "" }],
        },
    });
    const { handleSubmit, watch, control, formState: { errors } } = form;
    type AchievementType = z.infer<typeof AddAchievementSchema>;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "requirements"
    });
    const onSubmit = async (data: AchievementType) => {
        try {
            const requirements = data.requirements.map((requirement) => requirement.value)
            const parsed = parseInt(data.points)
            await add({ ...data, points: parsed, requirements });
            toast.success("Achievement added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return (
        <div>
            {/* <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Achievement</CardTitle>
                <CardDescription>
                    Fill in the details to create a new achievement
                </CardDescription>
            </CardHeader> */}
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="flex items-center w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="title"
                                title='Title'
                                placeholder="Enter Title"
                            />

                            <FormDatePicker
                                control={form.control}
                                name="deadline"
                                title='Deadline'
                            />

                            <FormInput
                                control={form.control}
                                name="points"
                                title='Points'
                                placeholder="Enter Points"
                            />

                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <FormMultiSelect
                                control={form.control}
                                name="departments"
                                title='Departments'
                                placeholder="Select technologies..."
                                options={departments}
                            />
                            <FormMultiSelect
                                control={form.control}
                                name="categories"
                                title='Categories'
                                placeholder="Select categories..."
                                options={categories}
                            />
                            <FormSelect
                                control={form.control}
                                name="level"
                                title='Level'
                                placeholder="Select level"
                                options={Object.values(Level).map((level) => ({
                                    label: level,
                                    value: level
                                }))}
                            />

                        </div>
                        <div className="space-y-2">
                            <FormLabel>Requirements</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-baseline">
                                    <FormInput
                                        control={form.control}
                                        name={`requirements.${index}.value`}
                                        placeholder="Enter requirement"
                                    />

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className='p-1 rounded-full w-8 h-8'
                                        onClick={() => remove(index)}>
                                        <X />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                onClick={() => append({ value: "" })}
                                className="mt-2 w-full"
                            >
                                + Add Requirement
                            </Button>
                        </div>

                        <div>
                            <FormTextArea
                                control={form.control}
                                name="description"
                                title='Description'
                                placeholder="Enter description (optional)"
                            />

                        </div>
                    </div>
                        <Button type="submit" className='px-9 '>
                            Add
                        </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddAchievementModule;