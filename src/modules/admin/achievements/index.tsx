import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/components/table';
import { Card } from '@/components/ui/card';
import { dateFormatter } from '@/lib/dateFormatter';
import { IAchievement } from '@/types/achievement';
import Link from 'next/link';
import React, { FC } from 'react';

export interface AchievementsModuleProps {
  achievements: IAchievement[]
}

const AchievementsModule: FC<AchievementsModuleProps> = ({ achievements }) => {
  const column: Column[] = [
    {
      label: 'Title',
      value: 'title'
    },
    {
      label: 'Deadline',
      value: 'deadline',
      render: (value:IAchievement) => {
        if(!value.deadline) return 'N/A'
        return dateFormatter(value.deadline)
      }
    },
    {
      label: 'Points',
      value: 'points'
    },
    {
      label: 'View More',
      value: '_id',
      render: (value:IAchievement) => (
        <div className='flex justify-center items-center w-full'>
          <Link href={`/admin/dashboard/achievements/${value._id}`}><ViewIcon size={20} /> </Link>
        </div>
      )
    },
  ]
  return (
      <Table data={achievements} column={column} />
  );
};

export default AchievementsModule;