'use client'
import FormInput from '@/components/common/form/input';
import FormTextArea from '@/components/common/form/textarea';
import FileUploader from '@/components/common/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useMutation } from '@apollo/client';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { blogCategorySchema } from '../validation';
import { CREATE_BLOG_CATEGORY } from '@/gql/blog-category';

interface AddCategoriesFormProps { }

const AddCategoriesForm: FC<AddCategoriesFormProps> = () => {
    const [add] = useMutation(CREATE_BLOG_CATEGORY)
    const router = useRouter()

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(blogCategorySchema),
    });
    const { handleSubmit } = form;
    type CategoryData = z.infer<typeof blogCategorySchema>;

    const onSubmit = async (data: CategoryData) => {
        add({
            variables: data
        }).then(() => {
            toast("category added successfully!")
            router.refresh()
        }).catch((e) => {
            toast.error(e.message)
        })
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent className='space-y-3'>
                            <FormInput
                                control={form.control}
                                name="name"
                                title='Category Name'
                                placeholder="Enter category's name"
                            />
                            <FormInput
                                control={form.control}
                                name="slug"
                                title='Slug'
                                placeholder="Enter slug"
                            />
                            <Card className='border-dashed'>
                                <CardContent>
                                    <FileUploader
                                        control={form.control}
                                        name="img"
                                        setValue={form.setValue}
                                    />
                                </CardContent>
                            </Card>
                            <FormTextArea
                                control={form.control}
                                name='description'
                                title='Description'
                                rows={5}
                            />
                            <Button>Submit</Button>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default AddCategoriesForm;
