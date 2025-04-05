import AttendenceModule from '@/modules/admin/dashboard/events/attendence';
import useEvents from '@/services/events';
import useUsers from '@/services/users';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AttendencePageProps { }

const AttendencePage: FC<AttendencePageProps> = async () => {
    const token = (await cookies()).get("token")?.value;
    const currentUser = (await cookies()).get("currentUser")?.value || '';
    const parsedUser = JSON.parse(currentUser)

    const { getAll } = useUsers({ token: token })    
    const data = await getAll(parsedUser.department?._id);
    
    const { getAll:getAllEvents } = useEvents({ token: token })
    const dataEvents = await getAllEvents();
    
    return (
        <AttendenceModule users={data} events={dataEvents}/>
    );
};

export default AttendencePage;