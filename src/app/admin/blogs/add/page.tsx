import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import AddBlogModule from '@/modules/admin/blogs/add';
import useBlogCategories from '@/services/blogs/categories';
import type { FC } from 'react';

interface AddBlogsPropsPage {}

const AddBlogsPage: FC<AddBlogsPropsPage> = async () => {
    const { token } = await getAuth()
    const { getAllBlogCategories } = useBlogCategories({ token })    
    const categories = await getAllBlogCategories()
    return (
        <>
            <Title text='Add Blog' goBack/>
            <AddBlogModule categories={categories}/>
        </>
    );
}

export default AddBlogsPage;
