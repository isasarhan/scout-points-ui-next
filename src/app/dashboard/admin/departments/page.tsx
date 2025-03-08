import AllDepartmentsModule from '@/modules/dashboard/admin/departments';
import useDepartments from '@/services/departments';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface DepartmentsPageProps { }


const DepartmentsPage: FC<DepartmentsPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;

    const { getAll } = useDepartments({ token: token })
    const data = await getAll();

    return (
        <AllDepartmentsModule departments={data}/>
    );
};

export default DepartmentsPage;