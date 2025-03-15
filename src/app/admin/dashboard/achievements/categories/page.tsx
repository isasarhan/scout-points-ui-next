import AchievementsCategoriesModule from '@/modules/admin/dashboard/achievements/categories/view';
import useAchievementCategory from '@/services/achievements/categories';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AchievementsCategoriesPageProps { }

const AchievementsCategoriesPage: FC<AchievementsCategoriesPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;

    const { getAll } = useAchievementCategory({ token: token })
    const data = await getAll();    

    return (
        <AchievementsCategoriesModule achievements={data}/>
    );
};

export default AchievementsCategoriesPage;