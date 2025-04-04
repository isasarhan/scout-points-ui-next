import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
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
    console.log(events);
    
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
            render: (value) => {
                return dateFormatter(value)
            }
        },
        {
            label: 'End Date',
            value: 'endDate',
            render: (value) => {
                if(!value) return 'N/A'
                return dateFormatter(value)
            }
        },
        {
            label: 'Time Range',
            value: 'timeRange',
            render: (value) => {
                if(!value) return 'N/A'
                return formatTimeRange(value)
            }
        },
        {
            label: 'Attendees',
            value: 'attendees',
            render: (value) => (
                <div className=''>
                    {value.length}
                </div>
            )
        },
        {
            label: 'View More',
            value: '_id',
            render: (value) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/dashboard/events/${value}`}><ViewIcon size={20} /> </Link>
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