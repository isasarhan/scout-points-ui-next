import { getAuth } from '@/lib/auth';
import AttendenceModule from '@/modules/admin/dashboard/events/attendence';
import useEvents from '@/services/events';
import useUsers from '@/services/users';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AttendencePageProps { }

const AttendencePage: FC<AttendencePageProps> = async () => {

    const { token, user } = await getAuth();

    const { getAll } = useUsers({ token: token })    
    const data = await getAll({department: user?.department?._id});
    
    const { getAll:getAllEvents } = useEvents({ token: token })
    const dataEvents = await getAllEvents();
    
    return (
        <AttendenceModule users={data} events={dataEvents}/>
    );
};

export default AttendencePage;