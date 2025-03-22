import UsersModule from "@/modules/admin/dashboard/users";
import useUsers from "@/services/users";
import { cookies } from "next/headers";


const UsersPage = async () => {
    const token = (await cookies()).get("token")?.value;
    const currentUser = (await cookies()).get("currentUser")?.value || '';
    console.log('currentUser', JSON.parse(currentUser));
        const parsedUser = JSON.parse(currentUser)
    
    const { getAll } = useUsers({ token: token })
    const data = await getAll(parsedUser.department._id);

    return (
        <UsersModule users={data} />
    );
};

export default UsersPage;
