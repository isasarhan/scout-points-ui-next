import AddDepartmentModule from '@/modules/dashboard/admin/departments/add';
import React, { FC } from 'react';

export interface AddDepartmentPageProps {}

const AddDepartmentPage: FC<AddDepartmentPageProps> = () => {
  return (
    <AddDepartmentModule/>
  );
};

export default AddDepartmentPage;