import AchievementsModule from '@/modules/main/achievements';
import useAchievements from '@/services/achievements';
import useAchievementCategory from '@/services/achievements/categories';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AchievementsPageProps { }

const AchievementsPage: FC<AchievementsPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;

    const { getAll } = useAchievements({ token: token })
    const data = await getAll();

    const { getAll:getAllCategories } = useAchievementCategory({ token: token })
    const categoriesData = await getAllCategories();   
    return (
        <AchievementsModule achievemnts={data} categories = {categoriesData}/>
    );
};

export default AchievementsPage;