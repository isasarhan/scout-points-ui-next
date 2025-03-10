import { Card } from '@/components/ui/card';
import Table, { Column } from '@/common/table';
import { IDepartment } from '@/types/department';
import React, { FC } from 'react';
import Link from 'next/link';
import { ViewIcon } from '@/assets/icons';

export interface AllDepartmentsModuleProps {
    departments: IDepartment[]
}

const AllDepartmentsModule: FC<AllDepartmentsModuleProps> = ({ departments }) => {
    const column: Column[] = [
        {
            label: 'Name',
            value: 'name'
        },
        {
            label: 'User Name',
            value: 'username'
        },
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: 'Status',
            value: 'status',
            render: (value) => (
                <div className={`${value === 'active' ? 'bg-green-600' : 'bg-red-500'}
                 text-white cursor-pointer flex justify-center p-2 rounded-full w-min`}>
                    {value}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value) => (
                <div className=''>
                    <Link href={`/dashboard/admin/users/${value}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={departments} column={column} />
        </Card>
    );
};

export default AllDepartmentsModule;