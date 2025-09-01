import Title from '@/components/common/title';
import NotFound from '@/components/not-found';
import { getAuth } from '@/lib/auth';
import EventsModule from '@/modules/admin/events';
import useEvents from '@/services/events';
import React, { FC } from 'react';

export interface EventsPageProps { }

const EventsPage: FC<EventsPageProps> = async () => {
    const { token, user } = await getAuth();

    const { getAll } = useEvents({ token: token })
    const data = await getAll(user?.department?._id);
    if (data.length === 0) {
        return (
            <NotFound
                title='No Events Found'
                description='It looks like there are no events available at the moment. Please check back later or try refreshing the page.' />
        )
    }
    return (
        <>
            <Title text='Events' buttonText='Add Event' url='/admin/events/add' />
            <EventsModule events={data} />
        </>
    );
};

export default EventsPage;