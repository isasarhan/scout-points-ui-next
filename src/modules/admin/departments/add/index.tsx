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
import { EnumDepartmentStatus, EnumDepartmentType } from '@/types/department';
import FormInput from '@/components/common/form/input';
import FormSelect from '@/components/common/form/select';
import FormTextArea from '@/components/common/form/textarea';

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
                        <FormInput
                            control={form.control}
                            name="name"
                            title='Name'
                            placeholder="Enter department name"
                        />
                        <FormSelect
                            control={form.control}
                            name="type"
                            title='Type'
                            placeholder="Select Type"
                            options={Object.values(EnumDepartmentType).map((type) => ({
                                label: type,
                                value: type
                            }))}
                        />
                        <FormSelect
                            control={form.control}
                            name="status"
                            title='Status'
                            placeholder="Select Status"
                            options={Object.values(EnumDepartmentStatus).map((type) => ({
                                label: type,
                                value: type
                            }))}
                        />

                        <FormTextArea
                            control={form.control}
                            name="description"
                            title='Description'
                            placeholder="Enter description (optional)"
                        />

                        <p className="text-2xl font-bold">Address</p>
                        <div className="flex items-center w-full gap-5">
                            <FormInput
                                control={form.control}
                                name="location.city"
                                title='City'
                                placeholder="Enter city"
                            />

                            <FormInput
                                control={form.control}
                                name="location.country"
                                title='Country'
                                placeholder="Enter country"
                            />

                        </div>

                        <div className="flex items-center w-full gap-5">
                            <FormInput
                                control={form.control}
                                name="location.postalCode"
                                title='Postal Code'
                                placeholder="Enter postal code"
                            />
                            <FormInput
                                control={form.control}
                                name="location.street"
                                title='Street'
                                placeholder="Enter street"
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
