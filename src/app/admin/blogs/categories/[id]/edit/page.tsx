import Title from '@/components/common/title';
import EditCategoryModule from '@/modules/admin/blogs/categories/edit-category';
import { fetchBlogCategories, fetchBlogCategory } from '@/services/blogs';
import { fetchProductCategory } from '@/services/products';
import type { FC } from 'react';

interface EditCategoryProps {
    params: Promise<{ id: string }>
}

const EditCategory: FC<EditCategoryProps> = async ({ params }) => {
    const { id } = await params

    const category = await fetchBlogCategory(id)
    console.log('category', category);
    
    return (
        <>
            <Title text='Edit Product Category' goBack />
            <EditCategoryModule category={category}/>
        </>
    );
}

export default EditCategory;
