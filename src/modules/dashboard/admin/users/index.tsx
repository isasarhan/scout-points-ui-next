import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
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
            label: 'View More Info',
            value: '_id',
            render: (value)=>(
                <Link href={`/dashboard/admin/users/${value}`}><ViewIcon /> </Link>
            )
        },
    ]
    return (
        <>
            <Table data={users} column={ column} />
        </>
    );
};

export default UsersModule;