import { token } from '@/lib/auth';
import AchievementsModule from '@/modules/main/achievements';
import useAchievements from '@/services/achievements';
import useAchievementCategory from '@/services/achievements/categories';
import useAchievementRequests from '@/services/achievementsRequests';
import React, { FC } from 'react';

export interface AchievementsPageProps { }

const AchievementsPage: FC<AchievementsPageProps> = async () => {
    const { getAll: getAchievements } = useAchievements({ token: token })
    // const data = await getAll({ rank: parsedUser.rank });

    const { getAll: getAllCategories } = useAchievementCategory({ token: token })

    const { getAll: getAllRequests } = useAchievementRequests({ token: token })

    const [achievements, categories, requests] = await Promise.all([getAchievements(), getAllCategories(), getAllRequests()])

    return (
        <AchievementsModule achievemnts={achievements} categories={categories} requests={requests}/>
    );
};

export default AchievementsPage;