import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getRankColor } from '@/lib/utils';
import { IUser } from '@/types/user';
import Link from 'next/link';
import React, { FC } from 'react';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users = [] }) => {
    console.log('users', users);

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
            render: (value) => (
                <Badge variant="outline" className={getRankColor(value)}>{value}</Badge>
            )
        },
        {
            label: 'Department',
            value: 'department',
            render: (value) => (
                <div className=''>
                    {value?.name}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/users/${value}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={users} column={column} />
        </Card>
    );
};

export default UsersModule;