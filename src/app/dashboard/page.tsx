import DashboardModule from '@/modules/dashboard';
import React, { FC } from 'react';

export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <DashboardModule/>
  );
};

export default DashboardPage;