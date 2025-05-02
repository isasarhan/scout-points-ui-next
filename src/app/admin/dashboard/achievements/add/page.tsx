import { getAuth } from '@/lib/auth';
import AddAchievementModule from '@/modules/admin/dashboard/achievements/add';
import useAchievementCategory from '@/services/achievements/categories';
import useDepartments from '@/services/departments';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AddAchievementPageProps { }

const AddAchievementPage: FC<AddAchievementPageProps> = async () => {
  const { token } = await getAuth();

  const { getAll: getAllDedpartments } = useDepartments({ token: token });

  const { getAll: getAllCategories } = useAchievementCategory({ token: token })

  const [departments, categories] = await Promise.all([getAllDedpartments(), getAllCategories()])
  
  return (
    <AddAchievementModule departments={departments} categories={categories} />
  );
};

export default AddAchievementPage;