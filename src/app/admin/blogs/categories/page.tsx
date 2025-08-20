import Title from '@/components/common/title';
import BlogCategoriesModule from '@/modules/admin/blogs/categories';
import { fetchBlogCategories } from '@/services/blogs';
import type { FC } from 'react';

interface AdminBlogsPropsCategories { }

const AdminBlogsCategories: FC<AdminBlogsPropsCategories> = async () => {
    const categories = await fetchBlogCategories()

    return (
        <>
            <Title text='Categories' />
            <BlogCategoriesModule categories={categories} />
        </>
    );
}

export default AdminBlogsCategories;
