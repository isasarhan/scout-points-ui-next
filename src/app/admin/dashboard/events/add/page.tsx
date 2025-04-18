import AddEventModule from '@/modules/admin/dashboard/events/add';
import useDepartments from '@/services/departments';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AddEventPageProps { }

const AddEventPage: FC<AddEventPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;

    const { getAll } = useDepartments({ token: token });
    const data = await getAll();
    return (
        <AddEventModule departments={data}/>
    );
};

export default AddEventPage;