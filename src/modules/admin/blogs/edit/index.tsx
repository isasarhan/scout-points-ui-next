'use client'
import { IBlog, IBlogCategory } from '@/types/blogs';
import { useEffect, useState, type FC } from 'react';
import FormInput from '@/components/common/form/input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '../validation';
import { z } from 'zod';
import RichEditor from '@/components/common/editor';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/common/file-uploader';
import { ScrollArea } from '@/components/ui/scroll-area'
import FormCheckbox from '@/components/common/form/checkbox';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import useBlogs from '@/services/blogs';
import { useUserContext } from '@/providers/UserProvider';

interface EditBlogModuleProps {
    categories: IBlogCategory[]
    blog: IBlog
}

const EditBlogModule: FC<EditBlogModuleProps> = ({ categories, blog }) => {
    console.log('blog', blog);
    
    const { token } = useUserContext()
    const { update } = useBlogs({ token })

    const blogCategories = blog.categories.map((category) => category._id)
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(blogSchema),
    });

    const { handleSubmit, setValue } = form;

    useEffect(() => {
        form.reset({
            categories: blogCategories,
            title: blog.title,
            rating: blog.rating,
            content: blog.content,
            author: blog.author._id,
        })
    }, [blog])



    type BlogData = z.infer<typeof blogSchema>;

    const onSubmit = async (data: BlogData) => {
        console.log('data', data);
        
        update(blog._id, data).then(() => {
            toast.success("Blog updated successfully!")
        }).catch((e) => {
            toast.error(e.message)
        })
    }

    const handleEditorValue = (value: string) => {
        setValue('content', value)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-5">
                        <div className="col-span-3  ">
                            <div className='space-y-5 h-screen'>
                                <FormInput
                                    title='Title'
                                    className='h-12 text-2xl! placeholder:text-lg!'
                                    control={form.control}
                                    name="title"
                                    placeholder="Enter blog title"
                                />
                                <div className='relative h-fit'>
                                    <h3 className='text-3xl mb-2'>Content</h3>
                                    <RichEditor
                                        text={blog.content}
                                        onValueChange={handleEditorValue} />
                                </div>
                                <Button className='mt-10' type='submit'>Update</Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='rounded border p-5'>
                                <div className=' text-2xl mb-3'>Categories</div>
                                <ScrollArea className='h-32 '>
                                    {categories.map((item) => (
                                        <FormCheckbox
                                            className='mb-3'
                                            key={item._id}
                                            control={form.control}
                                            name="categories"
                                            item={{
                                                label: item.name,
                                                value: item._id
                                            }}
                                        />
                                    ))}
                                </ScrollArea>
                            </div>
                            <div className='rounded border p-5'>
                                <FileUploader
                                    title='Cover Image'
                                    caption='Click here or drag an image to upload it'
                                    control={form.control}
                                    name="coverImage"
                                    setValue={form.setValue}
                                    defaultValue={blog.coverImage}
                                />
                            </div>
                            <div className='rounded border p-5'>
                                <FileUploader
                                    title='Featured Image'
                                    caption='Click here or drag an image to upload it'
                                    control={form.control}
                                    name="featuredImage"
                                    setValue={form.setValue}
                                    defaultValue={blog.featuredImage}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default EditBlogModule;
