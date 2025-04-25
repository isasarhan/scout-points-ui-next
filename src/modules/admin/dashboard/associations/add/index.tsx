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
import { EnumAssociationType } from '@/types/association';
import FormInput from '@/components/common/form/input';
import FormSelect from '@/components/common/form/select';
import FormTextArea from '@/components/common/form/textarea';

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
                <CardTitle className="text-2xl font-bold">Add Association</CardTitle>
                <CardDescription>
                    Fill in the details to create a new association
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col w-full gap-4">
                            <FormInput
                                control={form.control}
                                name="name"
                                title='Name'
                                placeholder="Enter association name"
                            />
                            <FormInput
                                control={form.control}
                                name="website"
                                title='Website'
                                placeholder="Enter association website"
                            />
                            <FormSelect
                                control={form.control}
                                name="type"
                                title='Type'
                                placeholder="Select Type"
                                options={Object.values(EnumAssociationType).map((type) => ({
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