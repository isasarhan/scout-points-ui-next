import ViewUserModule from '@/modules/dashboard/admin/users/view';
import useUsers from '@/services/users';
import { cookies } from 'next/headers';
import React, { FC } from 'react';


const fetchUser = async (id: string) => {
    const token = (await cookies()).get("token")?.value;
    const { getById } = useUsers({ token: token })
    return await getById(id)

}
const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const user = await fetchUser(id)
    
    return (
       <ViewUserModule user={user}/>
    );
};

export default UserPage;