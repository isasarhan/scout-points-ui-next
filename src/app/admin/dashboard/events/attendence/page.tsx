import AttendenceModule from '@/modules/admin/dashboard/users/attendence';
import useUsers from '@/services/users';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AttendencePageProps { }

const AttendencePage: FC<AttendencePageProps> = async () => {
    const token = (await cookies()).get("token")?.value;
    const currentUser = (await cookies()).get("currentUser")?.value || '';
    console.log('currentUser', JSON.parse(currentUser));
    const parsedUser = JSON.parse(currentUser)

    const { getAll } = useUsers({ token: token })
    const data = await getAll(parsedUser.department._id);
    return (
        <AttendenceModule users={data}/>
    );
};

export default AttendencePage;