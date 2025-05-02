import { getAuth } from '@/lib/auth';
import AchievementsModule from '@/modules/main/achievements';
import useAchievements from '@/services/achievements';
import useAchievementCategory from '@/services/achievements/categories';
import useAchievementRequests from '@/services/achievementsRequests';
import React, { FC } from 'react';
export interface AccountAchievementsPageProps { }

const AccountAchievementsPage: FC<AccountAchievementsPageProps> = async () => {
    const { token } = await getAuth();

    const { getAll:getAchievements } = useAchievements({ token })
    // const data = await getAll({ rank: parsedUser.rank });

    const { getAll: getAllCategories } = useAchievementCategory({ token })

    const { getAll: getAllRequests } = useAchievementRequests({ token })

    const [achievements, categories, requests] = await Promise.all([getAchievements(), getAllCategories(), getAllRequests()])
    
    return (
        <AchievementsModule achievemnts={achievements} categories={categories} requests={requests}/>
    );
};

export default AccountAchievementsPage;