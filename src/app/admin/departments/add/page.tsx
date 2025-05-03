import AddDepartmentModule from '@/modules/admin/departments/add';
import React, { FC } from 'react';

export interface AddDepartmentPageProps {}

const AddDepartmentPage: FC<AddDepartmentPageProps> = () => {
  return (
    <AddDepartmentModule/>
  );
};

export default AddDepartmentPage;