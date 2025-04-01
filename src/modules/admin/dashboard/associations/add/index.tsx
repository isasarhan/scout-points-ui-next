'use client'
import { useUserContext } from '@/providers/UserProvider';
import useAssociations from '@/services/associations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { addAssociationSchema } from '../validation';
import * as z from 'zod'
import { toast } from 'sonner';
import { handleAxiosError } from '@/lib/handleAxiosError';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export interface AddAssociationModuleProps { }

const AddAssociationModule: FC<AddAssociationModuleProps> = () => {
    const { token } = useUserContext();
    const { add } = useAssociations({ token });
    const router = useRouter();

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(addAssociationSchema),
    });
    const { handleSubmit } = form;
    type AssociationType = z.infer<typeof addAssociationSchema>;

    const onSubmit = (data: AssociationType) => {
        add(data)
            .then(() => {
                toast.success("Association added successfully!");
                router.push('/admin/dashboard/associations')
            })
            .catch((e) => {
                handleAxiosError(e)
            });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add User</CardTitle>
                <CardDescription>
                    Fill in the details to create a new association
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
                                            <Input placeholder="Enter user first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="scout">Scout</SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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

export default AddAssociationModule;