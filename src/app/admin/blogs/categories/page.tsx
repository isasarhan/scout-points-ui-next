import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import BlogCategoriesModule from '@/modules/admin/blogs/categories';
import useBlogCategories from '@/services/blogs/categories';
import type { FC } from 'react';

interface AdminBlogsPropsCategories { }

const AdminBlogsCategories: FC<AdminBlogsPropsCategories> = async () => {
    const { token } = await getAuth()
    const { getAllBlogCategories } = useBlogCategories({ token })
    const categories = await getAllBlogCategories()

    return (
        <>
            <Title text='Categories' />
            <BlogCategoriesModule categories={categories} />
        </>
    );
}

export default AdminBlogsCategories;
