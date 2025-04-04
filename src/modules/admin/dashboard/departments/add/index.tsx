'use client'
import useDepartments from '@/services/departments';
import React, { FC } from 'react';
export interface AddDepartmentModuleProps { }
import { useUserContext } from '@/providers/UserProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { addDepartmentSchema } from "../validation";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnumDepartmentType } from '@/types/department';

const AddDepartmentModule: FC<AddDepartmentModuleProps> = () => {
    const { token } = useUserContext()
    const { add } = useDepartments({ token })
    const form = useForm({
        resolver: zodResolver(addDepartmentSchema),
        defaultValues: {
            name: "",
            type: "",
            description: "",
            location: {
                city: "",
                country: "",
                postalCode: "",
                street: ""
            },
            status: ""
        }
    });
    const { handleSubmit } = form

    const onSubmit = (data: any) => {
        const filteredValues = {
            ...data,
            manager: data.manager === "" ? undefined : data.manager
        };
        add(filteredValues).then(() => {
            toast.success("Department added successfully!")
        }).catch((e) => {
            console.error(e);
            toast.error("Error adding department!")
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Department</CardTitle>
                <CardDescription>Fill in the details to create a new department</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter department name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter department name" {...field} />
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
                                                {Object.values(EnumDepartmentType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
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
                        <p className="text-2xl font-bold">Address</p>
                        <div className="flex items-center w-full gap-5">
                            <FormField
                                control={form.control}
                                name="location.city"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter city" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location.country"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex items-center w-full gap-5">
                            <FormField
                                control={form.control}
                                name="location.postalCode"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter postal code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location.street"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter street" {...field} />
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

export default AddDepartmentModule;
