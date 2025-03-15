'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AddCategoriesSchema } from '../validation';
import * as z from 'zod'
import { toast } from 'sonner';
import useAchievementCategory from '@/services/achievements/categories';
import { useUserContext } from '@/providers/UserProvider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export interface AddAchievementsCategoriesModuleProps { }

const AddAchievementsCategoriesModule: FC<AddAchievementsCategoriesModuleProps> = () => {
    const { token } = useUserContext();
    const router = useRouter()
    const { add } = useAchievementCategory({ token })
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(AddCategoriesSchema),
    });
    const { handleSubmit, formState:{errors} } = form;

    type CategoryType = z.infer<typeof AddCategoriesSchema>;

    const onSubmit = async (data: CategoryType) => {
        
        try {
            await add(data);
            toast.success("Achievement category added successfully!");
            router.refresh()
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Achievement Category</CardTitle>
                <CardDescription>
                    Fill in the details to create a new category
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col w-full gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="px-9 ">
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </>
    );
};

export default AddAchievementsCategoriesModule;