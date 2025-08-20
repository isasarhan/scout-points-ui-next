import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditBlogModule from '@/modules/admin/blogs/edit';
import useBlogs from '@/services/blogs';
import useBlogCategories from '@/services/blogs/categories';
import type { FC } from 'react';

interface EditBlogPageProps {
    params: Promise<{ id: string }>
}

const EditBlogPage: FC<EditBlogPageProps> = async ({ params }) => {
    const { id } = await params
    const { token } = await getAuth()
    const { getBlogById } = useBlogs({ token })
    const { getAllBlogCategories } = useBlogCategories({ token })
    const [blog, categories] = await Promise.all([getBlogById(id), getAllBlogCategories()])

    return (
        <>
            <Title text='Edit Blog' goBack />
            <EditBlogModule blog={blog} categories={categories} />
        </>
    );
}

export default EditBlogPage;
