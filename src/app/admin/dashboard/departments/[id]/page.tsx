import React, { FC } from 'react';
export interface DepartmentPageProps {
  height: number;
}
const DepartmentPage: FC<DepartmentPageProps> = () => {
  return (
    <div>
      Hello DepartmentPage
    </div>
  );
};

export default DepartmentPage;