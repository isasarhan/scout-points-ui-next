'use client'
import { IBlogCategory } from '@/types/blogs';
import { useState, type FC } from 'react';
import FormInput from '@/components/common/form/input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '../validation';
import { z } from 'zod';
import RichEditor from '@/components/common/editor';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/common/file-uploader';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormCheckbox from '@/components/common/form/checkbox';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/providers/UserProvider';
import useBlogs from '@/services/blogs';

interface AddBlogModuleProps {
    categories: IBlogCategory[]
}

type BlogData = z.infer<typeof blogSchema>;

const AddBlogModule: FC<AddBlogModuleProps> = ({ categories }) => {
    const { user, token } = useUserContext()
    const { addBlog } = useBlogs({ token })
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(blogSchema),
        defaultValues: {
            author: user?._id
        }
    });
    const { handleSubmit, setValue } = form;


    const onSubmit = async (data: BlogData) => {
        addBlog(data).then(() => {
            toast("Blog added successfully!")
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
                                <div className='relative '>
                                    <h3 className='text-3xl mb-2'>Content</h3>
                                    <RichEditor
                                        onValueChange={handleEditorValue} />
                                </div>
                                <Button className='mt-10' type='submit'>Create</Button>
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
                                />
                            </div>
                            <div className='rounded border p-5'>
                                <FileUploader
                                    title='Featured Image'
                                    caption='Click here or drag an image to upload it'
                                    control={form.control}
                                    name="featuredImage"
                                    setValue={form.setValue}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default AddBlogModule;
