'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { AddAchievementSchema } from '../validation';
import DatePicker from '@/common/datepicker';

export interface AddAchievementModuleProps { }

const AddAchievementModule: FC<AddAchievementModuleProps> = () => {
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddAchievementSchema),
    });
    const { handleSubmit, watch } = form;
    type UserType = z.infer<typeof AddAchievementSchema>;
    console.log(watch());
    
    const onSubmit = ()=>{}

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
                                        <FormLabel>First Name</FormLabel>
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
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </form>
                </Form>
        </Card>
    );
};

export default AddAchievementModule;