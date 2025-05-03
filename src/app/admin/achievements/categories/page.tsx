import { getAuth } from '@/lib/auth';
import AchievementsCategoriesModule from '@/modules/admin/achievements/categories/view';
import useAchievementCategory from '@/services/achievements/categories';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AchievementsCategoriesPageProps { }

const AchievementsCategoriesPage: FC<AchievementsCategoriesPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll } = useAchievementCategory({ token: token })
    const data = await getAll();    

    return (
        <AchievementsCategoriesModule categories={data}/>
    );
};

export default AchievementsCategoriesPage;