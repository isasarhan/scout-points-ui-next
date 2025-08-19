import NotFound from '@/components/not-found';
import { getAuth } from '@/lib/auth';
import AchievementsModule from '@/modules/admin/achievements';
import useAchievements from '@/services/achievements';
import React, { FC } from 'react';

export interface AchievementsPageProps {}

const AchievementsPage: FC<AchievementsPageProps> = async () => {
  const { token } = await getAuth();

  const { getAll } = useAchievements({ token: token })
  const data = await getAll();

    if (data.length === 0) {
        return (
            <NotFound
                title='No Achievements Found'
                description='It looks like there are no achievements available at the moment. Please check back later or try refreshing the page.' />
        )
    }
    return (
        <AchievementsModule achievements={data}/>
    );

};

export default AchievementsPage;