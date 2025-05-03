import { getAuth } from '@/lib/auth';
import AchievementsModule from '@/modules/admin/achievements';
import useAchievements from '@/services/achievements';
import React, { FC } from 'react';

export interface AchievementsPageProps {}

const AchievementsPage: FC<AchievementsPageProps> = async () => {
  const { token } = await getAuth();

  const { getAll } = useAchievements({ token: token })
  const data = await getAll();

  return (
    <AchievementsModule achievements={data}/>
  );
};

export default AchievementsPage;