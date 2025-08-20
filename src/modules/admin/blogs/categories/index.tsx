import { IBlogCategory } from '@/types/blogs';
import type { FC } from 'react';
import AddCategoriesForm from './categories-form';
import { Card } from '@/components/ui/card';
import CategoriesTable from './categories-table';

interface BlogCategoriesModuleProps {
    categories: IBlogCategory[]
}

const BlogCategoriesModule: FC<BlogCategoriesModuleProps> = ({ categories }) => {
    return (
         <div className='grid grid-cols-3 gap-5'>
            <div className=''>
                <AddCategoriesForm />
            </div>
            <Card className='col-span-2 h-[550px]'>
                <div className=' overflow-y-scroll'>
                    <CategoriesTable categories={categories} />
                </div>
            </Card>
        </div>
    );
}

export default BlogCategoriesModule;
