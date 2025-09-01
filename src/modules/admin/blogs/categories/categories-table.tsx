'use client'
import type { FC } from 'react';
import TableComp, { Column } from '@/components/table';
import Image from 'next/image';
import { Pen, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/common/discard-dialog';
import Link from 'next/link';
import { IBlogCategory } from '@/types/blogs';
import { useUserContext } from '@/providers/UserProvider';
import useBlogCategories from '@/services/blogs/categories';

interface CategoriesTableProps {
    categories: IBlogCategory[]
}

const CategoriesTable: FC<CategoriesTableProps> = ({ categories }) => {
    const { token } = useUserContext()
    const { remove } = useBlogCategories({ token })
    const router = useRouter()

    const handleDelete = (id: string) => {
        remove(id).then(() => {
            toast("category removed successfully!")
            router.refresh()
        }).catch((e) => {
            toast.error(e.message)
        })
    }

    const columns: Column[] = [
        {
            label: 'Featured Image',
            render: (value: IBlogCategory) => {
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
            render: (value: IBlogCategory) =>
                <div className='flex justify-center'>
                    <Link href={`/admin/blogs/categories/${value._id}/edit`}>
                        <Pen />
                    </Link>
                </div>
        },
        {
            label: 'Delete',
            render: (value: IBlogCategory) =>
                <ConfirmDialog
                    onConfirm={() => handleDelete(value._id!)}
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
        <TableComp data={categories} column={columns} />
    );
}

export default CategoriesTable;
