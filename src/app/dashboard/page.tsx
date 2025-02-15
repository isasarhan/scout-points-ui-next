import React, { FC } from 'react';
export interface DashboardPageProps {
  height: number;
}
const DashboardPage: FC<DashboardPageProps> = () => {
  return (
    <div>
      Hello DashboardPage
    </div>
  );
};

export default DashboardPage;