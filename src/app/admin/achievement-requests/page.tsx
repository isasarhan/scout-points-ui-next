import { getAuth } from '@/lib/auth';
import AchievementRequestsModule from '@/modules/admin/achievement-requests';
import useAchievementRequests from '@/services/achievementsRequests';
import React, { FC } from 'react';

export interface AchievementRequestsProps { }

const AchievementRequests: FC<AchievementRequestsProps> = async () => {

    const { token } = await getAuth();

    const { getAll: getAllRequests } = useAchievementRequests({ token })
    const requests = await getAllRequests()
    return (
        <AchievementRequestsModule requests={requests}/>
    );
};

export default AchievementRequests;