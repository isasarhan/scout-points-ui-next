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
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Achievement</CardTitle>
                <CardDescription>
                    Fill in the details to create a new achievement
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="flex items-center w-full gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Deadline</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="points"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Points</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Points" type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex items-center w-full gap-4'>
                            <FormField
                                control={form.control}
                                name="departments"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>departments</FormLabel>
                                        <FormControl>
                                            <Controller
                                                control={form.control}
                                                name="departments"
                                                render={({ field }) => (
                                                    <MultiSelect
                                                        options={departments}
                                                        selected={field.value || []}
                                                        onChange={field.onChange}
                                                        placeholder="Select technologies..."
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categories"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>categories</FormLabel>
                                        <FormControl>
                                            <Controller
                                                control={form.control}
                                                name="categories"
                                                render={({ field }) => (
                                                    <MultiSelect
                                                        options={categories}
                                                        selected={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Select technologies..."
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Level</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>

                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(Level).map((level) => (
                                                        <SelectItem key={level} value={level}>
                                                            {level}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Requirements</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-baseline">
                                    <FormField
                                        control={control}
                                        name={`requirements.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Enter requirement" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
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
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="Enter description (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className='px-9 '>
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default AddAchievementModule;