import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
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
      render: (value) => {
        return dateFormatter(value)
      }
    },
    {
      label: 'Points',
      value: 'points'
    },
    {
      label: 'View More',
      value: '_id',
      render: (value) => (
        <div className=''>
          <Link href={`/admin/dashboard/achievements/${value}`}><ViewIcon size={20} /> </Link>
        </div>
      )
    },
  ]
  return (
    <Card className='p-4'>
      <Table data={achievements} column={column} />
    </Card>
  );
};

export default AchievementsModule;