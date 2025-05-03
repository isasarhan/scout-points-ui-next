'use client'
import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { getRankColor } from '@/lib/utils';
import { useUserContext } from '@/providers/UserProvider';
import useUsers from '@/services/users';
import { IUser } from '@/types/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
    const { token } = useUserContext()
    const { getAll, update } = useUsers({ token })

    const router = useRouter()

    const handleChangePublicity = async (user: IUser) => {
        await update(user._id!, { isApproved: !user.isApproved }).then(() => {
            router.refresh()
            toast.success('updated!')
        })
    }
    const column: Column[] = [
        {
            label: 'First Name',
            value: 'firstName'
        },
        {
            label: 'Last Name',
            value: 'lastName'
        },
        {
            label: 'Email',
            value: 'email'
        },
        {
            label: 'Points',
            value: 'points'
        },
        {
            label: 'Rank',
            value: 'rank',
            render: (value:IUser) => (
                <Badge variant="outline" className={getRankColor(value.rank)}>{value.rank}</Badge>
            )
        },
        {
            label: 'Department',
            value: 'department',
            render: (value:IUser) => (
                <div className=''>
                    {value?.department?.name}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value:IUser) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/users/${value._id}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Is Approved',
            value: 'isApproved',
            render: (value: IUser) => {
                return <div className="flex items-center justify-center" >
                    <Switch checked={value.isApproved} onCheckedChange={() => handleChangePublicity(value)} />
                </div>
            }
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={users} column={column} />
        </Card>
    );
};

export default UsersModule;