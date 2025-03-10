import AddUserModule from "@/modules/admin/dashboard/users/add";
import useDepartments from "@/services/departments";
import { cookies } from "next/headers";
import React, { FC } from "react";
export interface AddUserPageProps {}
const AddUserPage: FC<AddUserPageProps> = async () => {
  const token = (await cookies()).get("token")?.value;

  const { getAll } = useDepartments({ token: token });
  const data = await getAll();
  return <AddUserModule departments={data}/>;
};

export default AddUserPage;
