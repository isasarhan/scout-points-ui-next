import { getAuth } from '@/lib/auth';
import AssociationsModule from '@/modules/admin/associations';
import useAssociations from '@/services/associations';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AssociationsPageProps { }

const AssociationsPage: FC<AssociationsPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useAssociations({ token: token })
    const data = await getAll();    
    return (
        <AssociationsModule associations={data}/>
    );
};

export default AssociationsPage;