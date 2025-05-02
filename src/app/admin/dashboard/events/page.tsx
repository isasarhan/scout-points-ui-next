import { getAuth } from '@/lib/auth';
import EventsModule from '@/modules/admin/dashboard/events';
import useEvents from '@/services/events';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface EventsPageProps { }

const EventsPage: FC<EventsPageProps> = async () => {
    const { token, user } = await getAuth();

    const { getAll } = useEvents({ token: token })
    const data = await getAll(user.department?._id);
    return (
        <EventsModule events={data}/>
    );
};

export default EventsPage;