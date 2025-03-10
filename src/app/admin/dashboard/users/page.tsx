import UsersModule from "@/modules/admin/dashboard/users";
import useUsers from "@/services/users";
import { cookies } from "next/headers";


const UsersPage = async () => {
    const token = (await cookies()).get("token")?.value;
    
    const { getAll } = useUsers({ token: token })
    const data = await getAll();

    return (
        <UsersModule users={data} />
    );
};

export default UsersPage;
