import { ViewIcon } from '@/assets/icons';
import Table, { Column } from '@/common/table';
import { Card } from '@/components/ui/card';
import { IAchievemntCategory } from '@/types/achievemntCategory';
import Link from 'next/link';
import React, { FC } from 'react';
import AddAchievementsCategoriesModule from '../add';

export interface AchievementsCategoriesModuleProps {
    categories: IAchievemntCategory[]
}
const AchievementsCategoriesModule: FC<AchievementsCategoriesModuleProps> = ({ categories }) => {
    const column: Column[] = [
        {
            label: 'Name',
            value: 'name'
        },
        {
            label: 'Description',
            value: 'description'
        },

    ]
    return (
        
        <div className="flex gap-5 ">
            <div className="flex-1">
                <AddAchievementsCategoriesModule />
            </div>
            <div className="flex-1">
                <Card className='p-4  h-1/2 overflow-y-scroll'>
                    <Table data={categories} column={column} />
                </Card>
            </div>
        </div>
    );
};

export default AchievementsCategoriesModule;