'use client'
import type { FC } from 'react';
import TableComp, { Column } from '@/components/common/table';
import Image from 'next/image';
import { IProductCategory } from '@/types/product';
import { Pen, Trash } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT_CATEGORY } from '@/gql/product-category';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/common/discard-dialog';
import Link from 'next/link';

interface CategoriesTableProps {
    categories: IProductCategory[]
}

const CategoriesTable: FC<CategoriesTableProps> = ({ categories }) => {
    const router = useRouter()
    const [remove] = useMutation(DELETE_PRODUCT_CATEGORY)

    const handleDelete = (id: string) => {
        remove({
            variables: { id }
        }).then(() => {
            toast("category removed successfully!")
            router.refresh()
        }).catch((e) => {
            toast.error(e.message)
        })
    }

    const columns: Column[] = [
        {
            label: 'Featured Image',
            render: (value: IProductCategory) => {
                const src = value.img ? value.img : '/images/place-holder.jpg'
                return <div className='flex justify-center'>
                    <Image src={src} width={60} height={60} alt='' />
                </div>
            }
        },
        {
            label: 'Name',
            value: 'name',
        },
        {
            label: 'Slug',
            value: 'slug',
        },
        {
            label: 'Edit',
            render: (value: IProductCategory) =>
                <div className='flex justify-center'>
                    <Link href={`/admin/blogs/categories/${value._id}/edit`}>
                        <Pen />
                    </Link>
                </div>
        },
        {
            label: 'Delete',
            render: (value: IProductCategory) =>
                <ConfirmDialog
                    onConfirm={() => handleDelete(value._id)}
                    text="Delete Order"
                    title="Delete Order"
                    description="Are you sure you want to delete order?">
                    <Button variant="outline" size="icon" className="bg-destructive text-destructive-foreground " >
                        <Trash size={20} className="text-white hover:text-black" />
                    </Button>
                </ConfirmDialog>
            // <div className='flex justify-center'><Trash  onClick={()=>handleDeleteCategory(value._id)}/></div>
        },

    ]
    return (
        <TableComp data={categories} columns={columns} />
    );
}

export default CategoriesTable;
