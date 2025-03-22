import AddAchievementModule from '@/modules/admin/dashboard/achievements/add';
import useAchievementCategory from '@/services/achievements/categories';
import useDepartments from '@/services/departments';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

export interface AddAchievementPageProps {}

const AddAchievementPage: FC<AddAchievementPageProps> = async () => {
  const token = (await cookies()).get("token")?.value;

  const { getAll } = useDepartments({ token: token });
  const data = await getAll();

  const { getAll:getAllCategories } = useAchievementCategory({ token: token })
    const categories = await getAllCategories();   
  return (
    <AddAchievementModule departments={data} categories={categories}/>
  );
};

export default AddAchievementPage;