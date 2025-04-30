import AchievementsModule from '@/modules/main/achievements';
import useAchievements from '@/services/achievements';
import useAchievementCategory from '@/services/achievements/categories';
import useAchievementRequests from '@/services/achievementsRequests';
import { IUser } from '@/types/user';
import { cookies } from 'next/headers';
import React, { FC } from 'react';
export interface AccountAchievementsPageProps { }

const AccountAchievementsPage: FC<AccountAchievementsPageProps> = async () => {
    const token = (await cookies()).get("token")?.value;
    const user = (await cookies()).get("currentUser")?.value;

    const parsedUser = JSON.parse(user!) as IUser
    console.log('parsedUser', parsedUser);

    const { getAll:getAchievements } = useAchievements({ token: token })
    // const data = await getAll({ rank: parsedUser.rank });

    const { getAll: getAllCategories } = useAchievementCategory({ token: token })

    const { getAll: getAllRequests } = useAchievementRequests({ token: token })

    const [achievements, categories, requests] = await Promise.all([getAchievements(), getAllCategories(), getAllRequests()])
    
    return (
        <AchievementsModule achievemnts={achievements} categories={categories} requests={requests}/>
    );
};

export default AccountAchievementsPage;