import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/components/table';
import { Card } from '@/components/ui/card';
import { IAssociation } from '@/types/association';
import Link from 'next/link';
import React, { FC } from 'react';

export interface AssociationsModuleProps {
    associations: IAssociation[]
}

const AssociationsModule: FC<AssociationsModuleProps> = ({associations=[]}) => {
    const column: Column[] = [
        {
            label: 'Name',
            value: 'name'
        },
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: 'Description',
            value: 'description'
        },
        {
            label: 'Website',
            value: 'website'
        },
        {
            label: 'View More',
            value: '_id',
            render: (value:IAssociation)=>(
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/users/${value._id}`}><ViewIcon size={20}/> </Link>
                </div>
            )
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={associations} column={ column} />
        </Card>
    );
};

export default AssociationsModule;