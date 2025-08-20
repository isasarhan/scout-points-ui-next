'use client'
import type { FC } from 'react';
import TableComp, { Column } from '@/components/table';
import ConfirmDialog from '@/components/common/discard-dialog';
import { IBlog, IBlogCategory, IBlogsResponse } from '@/types/blogs';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Pen, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { shortenString } from '@/lib/utils';
import Rating from '@/components/common/rating';
import { useUserContext } from '@/providers/UserProvider';
import useBlogs from '@/services/blogs';

interface BlogsModuleProps {
    blogs: IBlogsResponse
    categories: IBlogCategory[]
}

const BlogsModule: FC<BlogsModuleProps> = ({ blogs, categories }) => {
    const { token } = useUserContext()
    const { update, remove } = useBlogs({ token })
    const router = useRouter()

    const handleChangePublicity = async (blog: IBlog) => {
        await update(
            blog._id!, { enabled: !blog.enabled }
        ).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }
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
            value: 'featuredImage',
            render: (value: IBlog) => {
                const src = value.coverImage ? value.coverImage : '/images/place-holder.jpg'
                return <div className='flex justify-center'>
                    <div className='relative rounded-full w-20 h-20 overflow-hidden border'>
                        <Image
                            src={src}
                            alt=''
                            fill
                            className='object-cover  '

                        />
                    </div>
                </div>

            }
        },
        {
            label: 'Title',
            value: 'title',
            render: (value: IBlog) => <div>{shortenString(value.title)}</div>
        },
        {
            label: 'Author',
            render: (value: IBlog) =>
                <div className='flex justify-center'>{value.author.firstName}</div>
        },

        {
            label: 'Rating',
            value: 'rating',
            render: (value: IBlog) =>
                <div className='flex justify-center'><Rating rating={value.rating} size='sm' /></div>
        },
        {
            label: 'Is Enabled',
            value: 'enabled',
            render: (value: IBlog) => {
                return <div className="flex items-center justify-center" >
                    <Switch checked={value.enabled} onCheckedChange={() => handleChangePublicity(value)} />
                </div>
            }
        },
        {
            label: 'Edit',
            render: (value: IBlog) => {
                return <div className="flex items-center justify-center" >
                    <Link href={`/admin/blogs/${value._id}/edit`}><Pen /></Link>
                </div>
            }
        },
        {
            label: 'Delete',
            render: (value: IBlog) =>
                <ConfirmDialog
                    onConfirm={() => handleDelete(value._id)}
                    text="Delete Order"
                    title="Delete Order"
                    description="Are you sure you want to delete order?">
                    <Button variant="outline" size="icon" className="bg-destructive text-destructive-foreground " >
                        <Trash size={20} className="text-white " />
                    </Button>
                </ConfirmDialog>
        },

    ]
    return (
        <TableComp data={blogs.data} column={columns} />
    )
}

export default BlogsModule;
