import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
import { Card } from '@/components/ui/card';
import { IUser } from '@/types/user';
import Link from 'next/link';
import React, { FC } from 'react';
export interface UsersModuleProps {
    users: IUser[];
}
const UsersModule: FC<UsersModuleProps> = ({ users=[] }) => {
    // const router = use
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
            label: 'Department',
            value: 'department'
        },
        {
            label: 'View More',
            value: '_id',
            render: (value)=>(
                <div className=''>
                    <Link href={`/dashboard/admin/users/${value}`}><ViewIcon size={20}/> </Link>
                </div>
            )
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={users} column={ column} />
        </Card>
    );
};

export default UsersModule;