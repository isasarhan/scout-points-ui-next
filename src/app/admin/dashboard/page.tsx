import DashboardModule from '@/modules/admin';
import React, { FC } from 'react';

export interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <DashboardModule/>
  );
};

export default DashboardPage;