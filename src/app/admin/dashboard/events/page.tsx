import EventsModule from '@/modules/admin/dashboard/events';
import useEvents from '@/services/events';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface EventsPageProps { }

const EventsPage: FC<EventsPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;
    const currentUser = (await cookies()).get("currentUser")?.value || '';
    const parsedUser = JSON.parse(currentUser)

    const { getAll } = useEvents({ token: token })
    const data = await getAll(parsedUser.department._id);
    return (
        <EventsModule events={data}/>
    );
};

export default EventsPage;