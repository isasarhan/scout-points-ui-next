import { Card } from '@/components/ui/card';
import Table, { Column } from '@/components/table';
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
            render: (value:IDepartment) => (
                <div className={`text-white cursor-pointer flex justify-center `}>
                    <div className={`${value.status === 'active' ? 'bg-green-600' : 'bg-red-500'}  p-2 rounded-full`}>
                    {value.status}
                    </div>
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value:IDepartment) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/users/${value._id}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
    ]
    return (
            <Table data={departments} column={column} />
    );
};

export default AllDepartmentsModule;