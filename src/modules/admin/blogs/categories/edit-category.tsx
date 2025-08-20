'use client'
import { IProductCategory } from '@/types/product';
import { useEffect, type FC } from 'react';
import FormInput from '@/components/common/form/input';
import FormTextArea from '@/components/common/form/textarea';
import FileUploader from '@/components/common/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogCategorySchema } from '../validation';
import { UPDATE_BLOG_CATEGORIES } from '@/gql/blog-category';

interface EditCategoryModuleProps {
    category: IProductCategory
}

const EditCategoryModule: FC<EditCategoryModuleProps> = ({ category }) => {
    const [update] = useMutation(UPDATE_BLOG_CATEGORIES)

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(blogCategorySchema),
    });
    const { handleSubmit } = form;
    type CategoryData = z.infer<typeof blogCategorySchema>;

    useEffect(() => {
        form.reset({
            description: category.description,
            name: category.name,
            slug: category.slug
        })
    }, [category])

    const onSubmit = async (data: CategoryData) => {        
        update({
            variables: {
                id: category._id,
                ...data
            }
        }).then(() => {
            toast("category updated successfully!")
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
export default EditCategoryModule;
