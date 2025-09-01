import Title from '@/components/common/title';
import { getAuth } from '@/lib/auth';
import EditCategoryModule from '@/modules/admin/blogs/categories/edit-category';
import useBlogCategories from '@/services/blogs/categories';
import type { FC } from 'react';

interface EditCategoryProps {
    params: Promise<{ id: string }>
}

const EditCategory: FC<EditCategoryProps> = async ({ params }) => {
    const { id } = await params
    const { token } = await getAuth()
    const { getBlogCategoriesById } = useBlogCategories({ token })

    const category = await getBlogCategoriesById(id)

    return (
        <>
            <Title text='Edit Product Category' goBack />
            <EditCategoryModule category={category} />
        </>
    );
}

export default EditCategory;
