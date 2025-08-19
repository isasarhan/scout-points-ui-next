import NotFound from '@/components/not-found';
import { getAuth } from '@/lib/auth';
import AllDepartmentsModule from '@/modules/admin/departments';
import useDepartments from '@/services/departments';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface DepartmentsPageProps { }


const DepartmentsPage: FC<DepartmentsPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useDepartments({ token: token })
    const data = await getAll();
    
    if (data.length === 0) {
        return (
            <NotFound
                title='No Departments Found'
                description='It looks like there are no departments available at the moment. Please check back later or try refreshing the page.' />
        )
    }
    return (
        <AllDepartmentsModule departments={data} />
    );
};

export default DepartmentsPage;