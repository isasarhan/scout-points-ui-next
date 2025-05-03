import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/components/table';
import { Card } from '@/components/ui/card';
import { dateFormatter } from '@/lib/dateFormatter';
import { formatTimeRange } from '@/lib/formatTimeRange';
import { IEvent } from '@/types/event';
import Link from 'next/link';
import React, { FC } from 'react';

export interface EventsModuleProps {
    events: IEvent[]
}

const EventsModule: FC<EventsModuleProps> = ({ events }) => {
    const column: Column[] = [
        {
            label: 'Type',
            value: 'type'
        },
        {
            label: 'Location',
            value: 'location'
        },
        {
            label: 'Start Date',
            value: 'startDate',
            render: (value: IEvent) => {
                return dateFormatter(value.startDate)
            }
        },
        {
            label: 'End Date',
            value: 'endDate',
            render: (value: IEvent) => {
                if (!value.endDate) return 'N/A'
                return dateFormatter(value.endDate)
            }
        },
        {
            label: 'Time Range',
            value: 'timeRange',
            render: (value: IEvent) => {
                if (!value.timeRange) return 'N/A'
                return formatTimeRange(value.timeRange)
            }
        },
        {
            label: 'Attendees',
            value: 'attendees',
            render: (value: IEvent) => (
                <div className=''>
                    {value.attendees.length}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value: IEvent) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/events/${value._id}`}><ViewIcon size={20} /> </Link>
                </div>
            )
        },
    ]
    return (
        <Card className='p-4'>
            <Table data={events} column={column} />
        </Card>
    );
};

export default EventsModule;