import AssociationsModule from '@/modules/admin/dashboard/associations';
import useAssociations from '@/services/associations';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AssociationsPageProps { }

const AssociationsPage: FC<AssociationsPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;

    const { getAll } = useAssociations({ token: token })
    const data = await getAll();    
    return (
        <AssociationsModule associations={data}/>
    );
};

export default AssociationsPage;