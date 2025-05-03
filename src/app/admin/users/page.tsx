import { getAuth } from "@/lib/auth";
import UsersModule from "@/modules/admin/users";
import useUsers from "@/services/users";


const UsersPage = async () => {

    const { token, user } = await getAuth();
    
    const { getAll } = useUsers({ token })
    const data = await getAll({department: user?.department?._id});    
    
    return (
        <UsersModule users={data} />
    );
};

export default UsersPage;
