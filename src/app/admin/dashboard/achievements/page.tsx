import AchievementsModule from '@/modules/admin/dashboard/achievements';
import useAchievements from '@/services/achievements';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AchievementsPageProps {}

const AchievementsPage: FC<AchievementsPageProps> = async () => {
  const token = (await cookies()).get("token")?.value;

  const { getAll } = useAchievements({ token: token })
  const data = await getAll();

  return (
    <AchievementsModule achievements={data}/>
  );
};

export default AchievementsPage;